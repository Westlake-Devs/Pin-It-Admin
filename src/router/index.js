import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Audit from '../views/Audit.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/auditor'
  },
  {
    path: '/unuseddeletesoon',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auditor',
    name: 'Auditor',
    component: Audit,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// prevent unauthenticated users from accessing pages requiring authorization
router.beforeEach(async (to, from, next) => {
  console.log(firebase.auth().currentUser)
  console.log('user')
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!(await firebase.auth().currentUser) && reqAuth) {
    next('/login')
  } else next()
})

export default router
