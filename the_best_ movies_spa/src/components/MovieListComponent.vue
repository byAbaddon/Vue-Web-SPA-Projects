<template>
  <div > 
    <v-card   v-if="!store.movies.length"   color="black" loading>
      <v-card-title class="text-center"> Loading...</v-card-title>
        <v-img
        class="moving-image"
        color="black"
        height="200"
        src="/assets/images/loading/toilet.png"
        alt="Toilet"
        >
      </v-img>
      <v-card-title class="text-center"> {{ message }} </v-card-title>

      <p class="bg-text">
        <v-img class="animation mx-0" height="6" src="" ></v-img>
      </p>   
    </v-card>

  <v-row  class="rr my-1" >
    <v-col v-for="(movie, id) in store.movies" :key="id"  class="d-flex child-flex mb-3">
      <!--  ======= create cards ========== -->
      <v-card v-if="movie && movie.id" :id="movie.id" class="mx-auto bg-grey-darken-4"
         max-height="466" min-height="466" max-width="300" min-width="300"
     
         >
        <!--  title  -->
        <v-card-title  
        style="resize: none; overflow: auto; color:lavender"
        :class="{
          'd-flex justify-center align-center': showTitle(movie.title).length <= 35,
          'd-flex justify-start align-center': showTitle(movie.title).length >= 36,
          'mt-1 py-0 text-body-1': true
        }"
       >
        {{ showTitle(movie.title) }}
      </v-card-title>
      
        <!--  divider  -->
        <v-divider class="mx-12 py-2"></v-divider>

        <!--  img  -->
        <v-img :src="movie.imageUrl" :lazy-src="`https://picsum.photos/10/6?image=${4}`" max-width="220"
          max-height="320" min-width="220" min-height="320" alt="Cinema" class="mx-auto blur">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <!--  divider  -->
        <v-divider class="mx-12 mt-3"></v-divider>

        <p class="d-flex justify-center align-center">Year: {{ movie.year }}</p>
        <v-card-actions class="d-flex justify-between align-center" style="min-width: 16em">
          <v-btn class="bg-orange mx-auto" variant="flat" @click="showMovieDetailsBtn" > Details</v-btn>

          <v-btn v-show="store.isAdminLogin" min-width="80px" class="bg-blue mx-3" variant="flat" @click="editMovieBtn">
            Edit</v-btn>

          <v-btn v-show="store.isAdminLogin" class="bg-red mr-1" variant="flat" @click="deleteMovieBtn"> Delete</v-btn>

          <!-- <delete-dialog v-if="isDeleteComponentShow" :currentMovie="currentMovieTitleAndId" /> -->

        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
 <!-- router-view for /movies children -->
  <router-view />

</div>
</template>



<script setup>
import { useMoviesStore } from '@/stores/moviesStore'
import router from "@/router"
import { ref,} from "vue"


const store = useMoviesStore()

const message = ref('Please Wait')

setTimeout(() => message.value = 'Try connect to data base.', 5000)
setTimeout(() => message.value = 'Please Wait or Reload.' , 10000)
setTimeout(() => message.value = 'No found.' , 20000)



const showTitle = (title) => {
  try {
    if (title.search('/')) title = title.split('/')[1]    
     return title
  } catch {}
  finally {
    return title
  }
  
}

const showMovieDetailsBtn = (e) => {
  const id = e.currentTarget.parentNode.offsetParent.id
  router.push({
        name: 'details',
        query: {id} 
        })
  }


const editMovieBtn = (e) => {
  const id = e.currentTarget.parentNode.offsetParent.id
  router.push({
    name: 'factory',
    query: { id }
  }).catch(() => { })
}


const deleteMovieBtn = (e) => {
  const id = e.currentTarget.parentNode.offsetParent.id
  const title = e.currentTarget.parentNode.offsetParent.innerText.split('\n')[0]
  router.push({
        name: 'delete',
        query: {id, title} 
        })
}


</script>



<style scoped>

.rr {
  margin: 0 auto;
  padding:0;
  width: 100%;
}


.wrap-text {
  white-space: normal;
  word-break: break-word;
  text-align: center;
}

div {
  background: rgba(236, 226, 226, 0.212)
}

.blur {
  filter: blur(0)
}


/* За Chrome, Edge и Safari */
::-webkit-scrollbar {
  width: 50px; 
  height: 6px; 
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

::-webkit-scrollbar-track {
  background: #c0bcbc;
}



.moving-image {
  animation: moveImage 4s linear infinite;
}

@keyframes moveImage {
  0% {
    transform: translateX(-3em); 
  }
  50% {
    transform: translateX(3em);
  }
  100% {
    transform: translateX(-3em);
  }
}



.bg-text {
  overflow: hidden; 
}

.animation {
  animation: moveLine 4s linear infinite; 
}

@keyframes moveLine {
  0% {
    left: 0px; 
  }
  100% {
    left: 100%;
  }
}



</style>

