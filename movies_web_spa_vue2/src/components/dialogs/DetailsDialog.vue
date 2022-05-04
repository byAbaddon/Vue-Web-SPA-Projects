<template>
  <v-row justify="center">
    <v-col>
    <v-dialog max-width="500" min-height="840" v-model="dialog">
      <!-- v-slot  activator-->
      <template v-slot:activator="{on}">
        <v-btn
          outlined
          color="warning"
          v-on="on"
          @click="movieDetails"
        >
          Details
        </v-btn>
      </template>

      <!-- card-->
      <v-card  dark>
        <!-- card title-->
        <div>
          <v-card-title
            class="d-flex justify-center orange white--text text-h5 pa-2"
          >
            DETAILS
          </v-card-title>
        </div>

        <!-- img  -->
        <v-img
          class="mx-auto  px-1 mt-1"
          :src="movieData.imageUrl"
           max-height="360"
           max-width="250"
        ></v-img>

        <!-- movie title-->
        <v-card-text class="pb-1 mt-4">
          <span class="font-weight-black">Title: </span>
          {{ movieData.title }}
        </v-card-text>

        <!-- movie genres-->
        <v-card-text class="pb-1">
          <span class="font-weight-black">Genres: </span>
          {{ movieData.genres }}
        </v-card-text>

        <!-- movie description-->
        <v-card-text class="pb-1">
          <span class="font-weight-black">Description: </span>
          {{ movieData.description }}
        </v-card-text>

        <!-- movie rating-->
         <v-card-text class="pb-1">
          <span class="font-weight-black">Rating: <span>({{movieData.rating}})</span>
            <v-rating
              class="float-none"
              v-model="movieData.rating"
              background-color=""
              color="yellow"
              size="18"
              :readonly="false"
            ></v-rating>
          </span>
        </v-card-text>

   <!-- movie available tickets-->
        <v-card-text>
          <div>
            <span class="font-weight-black mt-7 ">Available tickets: </span>
            {{ movieData.tickets}}

          <span class="float-end">
              <!-- movie button close-->
             <v-btn text color="red" @click="dialog = false">Close</v-btn>
          </span>
          </div>
        </v-card-text>
        
      </v-card>
    </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import {movies} from "@/service/loadAllMovies";
export default {
  data: () => ({
    dialog: false,
    movieData: [],
  }),

  methods: {
    movieDetails(e) {
      const id = e.currentTarget.parentNode.offsetParent.id;
      this.movieData = movies.filter((x) => x.id == id)[0];
    },
  },

};
</script>