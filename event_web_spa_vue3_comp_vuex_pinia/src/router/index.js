import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: HomeView
  },

  {
    path: '/events',
    name: 'events',
    component: () => import('../views/EventsView.vue'),

  },

  {
    path: '/events/add',
    name: 'add',
    component: () => import('../views/AddNewEventView.vue'),
    
  },
  {
    path: '/events/edit/:id',
    name: 'edit',
    component: () => import('../views/EditEventView.vue'),
    
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
