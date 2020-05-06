import firebase from 'firebase'
import paths from './paths'

export default {
  async fetchPendingPosts () {
    const snapshot = await firebase.firestore().collection(paths.pendingPosts).get()
    return snapshot.docs.map(doc => doc.data())
  },

  async fetechPostImageURLs (post) {
    var urls = []
    const refs = await firebase.storage().ref(paths.pendingAttachments + `users/${post.owner}/${post.id}`)
    await (await refs.listAll()).items.forEach(async ref => {
      urls.push(await (ref.getDownloadURL()))
    })
    return urls
  },

  async approvePendingPost (post) {

  },

  async rejectPendingPost (post) {
    try {
      await firebase.firestore().doc(paths.pendingPosts + `${post.id}`).delete()
      const refs = await firebase.storage().ref(paths.pendingAttachments + `users/${post.owner}/${post.id}`)
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
