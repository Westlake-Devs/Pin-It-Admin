import firebase from 'firebase'
import paths from './paths'

async function moveFirestoreDoc (from, to) {
  const ref = await firebase.firestore().doc(from).get()
  const dat = ref.data()
  await firebase.firestore().doc(from).delete()
  await firebase.firestore().doc(to).set(dat)
}

async function moveStorageCollectionContent (from, to) {
  const refs = await firebase.storage().ref(from)
  await (await refs.listAll()).items.forEach(async (ref, i) => {
    var xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.onload = async (event) => {
      await firebase.storage().ref(`${to}/img-${i}.jpg`).put(xhr.response)
      await ref.delete()
    }
    xhr.open('GET', (await ref.getDownloadURL()))
    xhr.send()
  })
}

export default {
  async fetchPendingPosts () {
    const snapshot = await firebase.firestore().collection(paths.pendingPosts).get()
    return snapshot.docs.map(doc => doc.data())
  },

  async fetechPostImageURLs (post) {
    var urls = []
    const refs = await firebase.storage().ref(`${paths.pendingAttachments}users/${post.owner}/${post.id}`)
    await (await refs.listAll()).items.forEach(async ref => {
      urls.push(await (ref.getDownloadURL()))
    })
    return urls
  },

  async approvePendingPost (post) {
    moveFirestoreDoc(`${paths.pendingPosts}${post.id}`, `${paths.publicPosts}${post.id}`)
    moveStorageCollectionContent(`${paths.pendingAttachments}users/${post.owner}/${post.id}`, `${paths.publicAttachments}users/${post.owner}/${post.id}`)
  },

  async rejectPendingPost (post) {
    try {
      await firebase.firestore().doc(`${paths.pendingPosts}${post.id}`).delete()
      const refs = await firebase.storage().ref(`${paths.pendingAttachments}users/${post.owner}/${post.id}`)
      await (await refs.listAll()).items.forEach(async ref => {
        await ref.delete()
      })
    } catch (err) {
      console.log(`Error while deleting post ${post.id}: ${err}`)
    }
  },

  async rejectPublicPost (post) {

  }

}
