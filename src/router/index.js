import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '../views/HomePage.vue'
import MoviesPage from '../views/MoviesPage.vue'
import FactoryPage from '../views/FactoryPage.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import LogoutPage from '../views/LogoutPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },

  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesPage
  },

  {
    path: '/factory',
    name: 'factory',
    component: FactoryPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('auth')) next('false') 
// })



export default router



