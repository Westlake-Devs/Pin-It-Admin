import firebase from 'firebase'
import paths from './paths'

class PostManagerError extends Error {
  constructor (message) {
    super(message)
    this.type = 'PostManagerError'
  }
}

async function moveFirestoreDoc (from, to) {
  console.log(`move ${from} -> ${to}`)

  const snapshot = await firebase.firestore().doc(from).get()
  if (!snapshot.exists) throw new PostManagerError('This post is no longer pending, it was approved or deleted by another admin.')

  const dat = snapshot.data()
  await firebase.firestore().doc(from).delete()
  await firebase.firestore().doc(to).set(dat)
}

async function overwriteFirestoreDoc (from, to) {
  console.log(`overwrite ${from} -> ${to}`)

  const toSnapshot = await firebase.firestore().doc(to).get()
  const fromSnapshot = await firebase.firestore().doc(from).get()
  if (!toSnapshot.exists) throw new PostManagerError('This edit is no longer pending, the original post has been deleted.')
  if (!fromSnapshot.exists) throw new PostManagerError('This edit is no longer pending, it was approved or deleted by another admin.')

  const dat = fromSnapshot.data()
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
    return snapshot.docs.map(doc => {
      var dat = doc.data()
      dat.displayDate = dat.timestamp.toDate().toLocaleString()
      return dat
    })
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
    if (post.action === 'edit') await overwriteFirestoreDoc(`${paths.pendingPosts}${post.id}`, `${paths.publicPosts}${post.id}`)
    else {
      await moveFirestoreDoc(`${paths.pendingPosts}${post.id}`, `${paths.publicPosts}${post.id}`)
      await moveStorageCollectionContent(`${paths.pendingAttachments}users/${post.owner}/${post.id}`, `${paths.publicAttachments}users/${post.owner}/${post.id}`)
    }
  },

  async rejectPendingPost (post) {
    try {
      const snapshot = await firebase.firestore().doc(`${paths.pendingPosts}${post.id}`).get()
      if (!snapshot.exists) throw new PostManagerError('This item is no longer pending, it was approved or deleted by another admin.')
      await await firebase.firestore().doc(`${paths.pendingPosts}${post.id}`).delete()
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
