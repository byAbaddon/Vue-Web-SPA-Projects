<template>
  <div  class="">
      <h2 class="text-center mt-0 text-uppercase">Choose a movie from the list of <span
        class="text-red-darken-4">
        {{ allMoviesCount}}
      </span> great movies</h2>
      <h3 class="text-blue  text-center mt-1 text-uppercase text-decoration-underline">or search by options</h3>
    

    <div>
      <v-card class="mt-1"  max-height="8em">
        <v-tabs 
        class="mt-1 d-flex"  
        v-model="tab" align-tabs="center"  bg-color="deep-purple-darken-4" center-active slider-color="red-darken-4">
          <v-tab :style="{ width: !hideTab ? '100%' : '' }" :value="0" class=" body-2 font-weight-bold">
           <span class="d-none d-sm-inline">All-Movies</span>
            <span class="d-inline d-sm-none">Movies</span>
          </v-tab>
          <v-tab v-show="hideTab" :value="1" class=" body-2 text-yellow font-weight-bold">Name </v-tab>
          <v-tab v-show="hideTab" :value="2" class=" text-green  body-2 font-weight-bold">Genre</v-tab>
          <v-tab v-show="hideTab" :value="3" class=" text-orange body-2 font-weight-bold">Year</v-tab>
        </v-tabs>
      </v-card>
    </div>

    <SearchMovieComponent :activeTab="tab" />  
    <MovieListComponent />

  </div>
</template>


<script setup>
 // Components
import MovieListComponent from '@/components/MovieListComponent.vue';
import SearchMovieComponent from '@/components/SearchMovieComponent.vue'
import { saveDataToLocalStorage, getDataFromLocalStorage } from '@/storage/localeStorage'

import { useMoviesStore } from '@/stores/moviesStore';
import { ref, watch, onMounted , onUnmounted } from 'vue'
// import { previousRoute } from "@/router/index";


const store = useMoviesStore()
const tab = ref(0)
const hideTab = ref(true)
let allMoviesCount = ref('')


onMounted(async () => {
  // if (previousRoute) {
  //     console.log('Redirect path form:', previousRoute.fullPath)
  //   } 

  if (store.isFirstTimeLoadMovies && store.movies.length > 10) {
    allMoviesCount.value = store.movies.length || ''
    store.isFirstTimeLoadMovies = false
    //--------------------------------------
    console.log("M View Locale Storage:", store.movies.length)
  } else {      
    let newDataMovies = await store.loadMoviesFromStore()
    saveDataToLocalStorage('dataMovies', newDataMovies)
    allMoviesCount.value = newDataMovies.length
    console.log("M View Store:", store.movies.length)
  }
})




onUnmounted(() => {
  store.stopBaseListening()
})


watch(tab, (newValue, oldValue) => {
  if (newValue != 0) hideTab.value = false 
  else hideTab.value = true
  // console.log(`Tab changed from ${oldValue} to ${newValue}`);
})


</script>





<style scoped>
h2, h3{
  text-shadow: 3px 3px 3px rgba(218, 3, 3, 0.4);
}

</style>