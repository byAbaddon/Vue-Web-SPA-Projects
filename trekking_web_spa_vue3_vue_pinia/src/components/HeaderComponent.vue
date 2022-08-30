<script setup>
import { useDataStore } from "@/stores/userData";
import { onMounted} from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import { useDisplay } from 'vuetify'


const { mobile, name } = useDisplay()
const userData = useDataStore()
const route = useRoute()
const router = useRouter()

const items = ['Home', 'Login', 'Register']
const items2 = ['Add-trek', 'User-statistic', 'Logout']


onMounted(() => {  // if page is refresh/reloaded; Reset localeStore  and route to Home page 
if (localStorage.getItem('auth') != null) {
    const userName = document.getElementById('user')
  if (userName.textContent == 'Anonymous') {
      userData.logout()
      router.push("/").catch(() => { })
   }
 }  
})

const onMenuBtn = path => {
  if (path == 'Home') {
    router.push('/')  
  } 
  else if (path == 'Logout') {
    router.push('/')  
    userData.logout()
  } else {
    router.push('/' + path.toLowerCase()) 
  } 
}  


</script>

<template>
  <div class="bg-grey-darken-3">
   <v-app-bar v-if="name == 'sm' || name == 'xs'" color="grey-darken-3"  density="compact">
      <!-- phone menu  -->    
      <v-menu transition="scale-transition">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon  v-bind="props"   class="" >
          </v-app-bar-nav-icon>
        </template>
  
        <v-list >
          <v-list-item   v-for="(path, i) in !userData.isAuth ? items : items2" :key="i" >
          
          <v-list-item-title >
            <v-btn
             @click="onMenuBtn(path)"
             variant="plain"> {{path}}  </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
       <v-spacer></v-spacer>
       <v-btn  disabled>{{name == 'xs' ? 'Phone' : 'Tablet'}} Version</v-btn>
    </v-app-bar>

 <nav v-else  class="site-header sticky-top mb-0">
      <!-- User Not Login-->
      <v-icon color="yellow-darken-3" size="30" class="mt-1 ml-4  float-start"> mdi-image-filter-hdr</v-icon> 
      <div v-if="!userData.isAuth"  class="ml-12 container d-flex float-right"> 
        <router-link to="/login">
          <a class="header-hover py-2 d-none d-md-inline-block mr-12">Login</a>
        </router-link>
 
        <router-link to="/register">
          <a class="header-hover py-2 d-none d-md-inline-block mr-12">Register</a>
        </router-link>
      </div>

     <!-- User Login-->
      <div v-else class="d-flex justify-space-around">  
       
        <router-link to="/add-trek">
          <a class="header-hover py-2 d-none d-md-inline-block">RequestTrek</a>
        </router-link>
         
        <router-link :to="`${route.name == 'user' ? '/' : '/user-statistic'}`">
          <a class="header-hover py-2 d-none d-md-inline-block"
            >Hello, <span id="user" class="text-grey text-decoration-underline" >{{ userData.data.displayName || 'Anonymous'}}</span> </a
          >
        </router-link>
  
        <router-link to="/">
          <a @click="userData.logout" class="header-hover py-2 d-none d-md-inline-block">Logout</a>
        </router-link>
      </div>
    </nav>

  </div>
</template>

