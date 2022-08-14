<template>
  <v-app-bar color="blue-grey-darken-3"  density="compact">
  
      <!-- phone menu  -->    
      <v-menu transition="scale-transition"   >
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon  v-bind="props"   class="hidden-md-and-up"  >
          </v-app-bar-nav-icon>
        </template>
  
        <v-list>
          <v-list-item  v-for="(path, i) in !userData.isAuth ? items : items2" :key="i" >
          
          <v-list-item-title>
            <v-btn
             @click="onMenuBtn(path)"
             variant="plain"> {{path}}  </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    
     <v-avatar size="36px" class="ml-1">
        <v-icon v-if="!userData.isAuth" color="red darken-2">mdi-eslint</v-icon>     
        <v-img  v-else  alt="Avatar" :src="userData.data.photoURL"> </v-img>
        <v-icon v-if="!userData.data.photoURL && userData.isAuth" color="info" icon="mdi-account-circle"></v-icon>
     </v-avatar>
    <!-- <v-icon v-else color="red darken-2">{{userData.data.photoURL }}</v-icon>  -->
    <v-app-bar-title class="ml-6">Hello, {{userData.isAuth ? userData.data.displayName : 'Anonymous'}}</v-app-bar-title>

   
       <v-btn class="hidden-sm-and-down"   to="/" >Home</v-btn>
     
      <div v-if="userData.isAuth"  class="hidden-sm-and-down">
         <v-spacer></v-spacer>
          <v-btn  to="/events">Events</v-btn>
          <v-btn  to="/about">About</v-btn>
          
      </div>
      
      <v-spacer></v-spacer>

      <v-btn  class="hidden-sm-and-down" v-if="!userData.isAuth" to="/login">Login</v-btn>
      <v-btn  class="hidden-sm-and-down" v-else @click="userData.logout"  to="/">Logout</v-btn>
     
      
  </v-app-bar>
</template>


<script setup>
import { useRouter} from 'vue-router'  
import { useDataStore } from "@/stores/userData";


const userData = useDataStore()
const items =  ['Home', 'Login',]
const items2 = ['Home', 'Events', 'About', 'Logout']
const router = useRouter()

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
