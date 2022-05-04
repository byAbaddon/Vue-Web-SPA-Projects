<template>
  <v-row class="my-10">
    <v-col
      v-for="(movie, id) in allMovies"
      :key="id"
      class="d-flex child-flex mb-12"
      cols="12"
      xs="3"
      sm="6"
      md="3"
    >
      <!--  ======= create cards ========== -->
      <v-card
        :id="movie.id"
        dark
        class="mx-auto"
        max-height="600"
        max-width="340"
      >
        <!--  title  -->
        <v-card-title class="blue--text justify-center mt-2 py-0">{{
          movie.title
        }}</v-card-title>

        <!--  divider  -->
        <v-divider class="mx-12 py-2"></v-divider>

        <!--  img  -->
        <v-img
          :src="movie.imageUrl"
          :lazy-src="`https://picsum.photos/10/6?image=${1}`"
          max-width="220"
          max-height="320"
          min-height="320"
          height=""
          class="mx-auto"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <!--  divider  -->
        <v-divider class="mx-12 mt-3"></v-divider>

        <!--  tickets  -->
        <v-card-text>
          <div >  
          <p v-if="movie.tickets" class="ml-8 mb-4 body-1"> Available tickets: {{ movie.tickets }}</p>
          <p v-else class=" mb-2 red--text text-center  text-decoration-line-through  font-weight-bold title"> OUT OF STOCK </p>
          </div>
        </v-card-text>

        <!--  buttons -->
        <v-card-actions>
           <slot></slot>   
        </v-card-actions>        
       
       
      </v-card>
    </v-col>

    <v-col> </v-col>
  </v-row>
</template>

<script>
import {getAllMoviesFromBase} from "@/service/loadAllMovies";

import {movies} from '@/service/loadAllMovies'


export default {


  data: () => ({
    allMovies: [],
  }),

  methods:{},

 created() {
      this.allMovies = movies
      const uid = JSON.parse(localStorage.getItem('auth')).uid
      getAllMoviesFromBase().then((m) => (this.allMovies = m.filter(x=> x.creatorUid == uid)));
  },

};
</script>

