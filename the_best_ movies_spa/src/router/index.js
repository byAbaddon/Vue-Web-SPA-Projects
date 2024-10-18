import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/MoviesView.vue'),
    children: [
      {
        path: 'details', 
        name: 'details',
        component: () => import('@/components/DetailsComponent.vue')
      },
      {
        path: 'delete', 
        name: 'delete',
        component: () => import('@/components/DeleteComponent.vue')
      },
    ]

  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginVies.vue'),
    // meta: { requiresAuth: true }, // this path needed auth
  },


  {
    path: '/factory',
    name: 'factory',
    component: () => import('@/views/FactoryView.vue'),
    props: true,
   
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {  //go to up page 
    
    if (savedPosition) {
      return savedPosition;
    } 

    if (to.path == '/movies') {
      return false; // no scroll to top
    }

    return { top: 0 }; // go to top
  }
})



export let previousRoute = null;
// Security check for route authentication
router.beforeEach((to, from, next) => {
  previousRoute = from; 
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const user = auth.currentUser;

    if (!user) {
      next('/')// if user not logged in, go to home
    } else {
      next() // if user logged in, continue
    }
  } else {
    next() // if no authentication required, continue
  }
})

export default router;
