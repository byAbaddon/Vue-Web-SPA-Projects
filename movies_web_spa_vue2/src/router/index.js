import Vue from 'vue'
import VueRouter from 'vue-router'
import {getAuth,  onAuthStateChanged} from "firebase/auth";

import HomePage from '../views/HomePage.vue'
import MoviesPage from '../views/MoviesPage.vue'
import FactoryPage from '../views/FactoryPage.vue'
import AboutPage from '../views/AboutPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue'
import LogoutPage from '../views/LogoutPage'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomePage,
  },

  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage,
    
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesPage,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/factory',
    name: 'factory',
    component: FactoryPage,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/about',
    name: 'about',
    component: AboutPage,
    meta: {
      requiresAuth: true
    }
  },

  {                   //wrong path, clear path, and redirect to home page 
    path: '*',
    redirect: '/',
    
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})





router.beforeEach((to, from, next) => {
  onAuthStateChanged(getAuth(), (user) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!user) {
            next({ path: '/'})
          } else {
            next()
          }

    } else {
          next()
      }
    
   })
});


export default router