import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/details-trek/:id',
      name: 'detailsTrek',
      component: () => import('@/views/DetailsTrekView.vue')
    },
    {
      path: '/add-trek',
      name: 'addTrek',
      component: () => import('@/views/AddTrekView.vue')
    },
    {
      path: '/edit-trek/:id',
      name: 'editTrek',
      component: () => import('@/views/EditTrekView.vue')
    },
    {
      path: '/user-statistic',
      name: 'user',
      component: () => import('@/views/UserStatisticView.vue')
    }
  ]
})

export default router
