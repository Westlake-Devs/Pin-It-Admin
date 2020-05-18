import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Audit from '../views/Audit.vue'
import PublicPreview from '../views/PublicPreview.vue'
import store from '@/store'

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
  },
  {
    path: '/publicpreview',
    name: 'PublicPreview',
    component: PublicPreview,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

// prevent unauthenticated users from accessing pages requiring authorization
router.beforeEach(async (to, from, next) => {
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!(store.state.currentUser) && reqAuth) next('/login')
  else if (store.state.currentUser && to.name === 'Login') next('/')
  else next()
})

export default router
