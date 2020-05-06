import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Audit from '../views/Audit.vue'

Vue.use(VueRouter)

const routes = [
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
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/auditor',
    name: 'Auditor',
    component: Audit
  }
]

const router = new VueRouter({
  routes
})

export default router
