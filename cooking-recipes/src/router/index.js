import { createRouter, createWebHistory} from 'vue-router'

const routes = [{
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView')
  },

    {
    path: '/category',
    name: 'category',
    component: () => import('@/views/CategoryView.vue'),
    meta: {
      requiresAuth: true
    }
  },
    
  {
    path: '/category/recipe', name: 'recipe', component: () => import('@/views/RecipeView'),
       children: [   
          { path  : 'all-recipes/:id' , name: 'all-recipes' , component: () => import('@/components/AllRecipesComponent')},
          { path  : 'edit/:id' , name: 'edit' , component: () => import('@/components/EditRecipeComponent')},
          { path  : 'details/:id', name: 'details' , component: () => import('@/components/DetailsRecipeComponent')},   
         ]
 },

  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/ShareView'),
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/MessageCenterView'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    // redirect: '/',
    component: () => import('@/views/NotFoundView')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: "exact-active",
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !localStorage.getItem("auth")) {
    next({ name: 'home' }) 
    return
    //  localStorage.getItem("auth") == null  ? next({ name: 'home' }) : next()
  } 
    next()
  
});






export default router