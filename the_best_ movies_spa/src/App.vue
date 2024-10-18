<template>
  <v-app class="container">
    <HeaderComponent class="item" />
    <v-main class="item">
      <router-view />
    </v-main>
    <FooterComponent class="item" />
  </v-app>
</template>


<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import router from "@/router"
import { onBeforeMount, onMounted} from "vue"
import {loadAllMoviesFromBaseOnce} from '@/service/loadAllMovies'
import { useMoviesStore } from '@/stores/moviesStore';
import { saveDataToLocalStorage, getDataFromLocalStorage } from '@/storage/localeStorage'

const store = useMoviesStore()

onBeforeMount(() => {
  if (localStorage.getItem("auth") == null) {
      console.log('Admin no is signed in / redirect.')
      router.push("/").catch(() => { })
  } else {
      store.isAdminLogin = true
    }
})



onMounted( async () => {
  await  loadMoviesWithRetry()
})


let isLoading = false;

async function loadMoviesWithRetry(maxRetries = 3, delay = 2000) {
  if (isLoading) return; 
  isLoading = true;

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const movies = await loadAllMoviesFromBaseOnce();
      store.movies = movies;
      saveDataToLocalStorage('dataMovies', movies);
      console.log("Movies loaded in App:", store.movies.length);
      break; 
    } catch (error) {
      attempt++;
      console.error(`Failed to load movies (Attempt ${attempt}):`, error);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error("All attempts to load movies failed.");
      }
    }
  }

  isLoading = false; //
}


</script>


<style>
body {
  user-select: none;
  background: #e8eaf6;

  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
   user-select: none;

   font-family :"Playwrite CU", cursive;
   font-optical-sizing :auto;
   font-style :normal;
   font-size :smaller;

}

.container {
  display: flex;
  flex-wrap: wrap;

}

.item {
  flex: 1;
  margin: 0px;
}
</style>