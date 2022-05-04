<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4" class="mx-auto my-2 px-8">
        <v-select
          :loading="loading"
          loader-height="1"
          @change="change"
          color="blue"
          hide-selected
          :hint="this.allMovies.length ? `Searching... found ${this.allMovies.length} movies.` : 'Sorry not found movies in this genre!'"
          prepend-icon="mdi-magnify-minus-outline blue--text"
          :items="items"
          :menu-props="{ down: true, offsetY: true }"
          label="Search movies for genre..."
        ></v-select>
      </v-col>
    </v-row>

    <template>
      <v-row class="my-10">
        <v-col
          v-for="(movie, id) in allMovies"
          :key="id"
          class="d-flex child-flex mb-12"
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
              <div>
                <p v-if="movie.tickets" class="ml-8 mb-4 body-1">
                  Available tickets: {{ movie.tickets }}
                </p>
                <p
                  v-else
                  class=" mb-2 red--text text-center text-decoration-line-through font-weight-bold title "
                   >
                  OUT OF STOCK
                </p>
              </div>
            </v-card-text>

            <!--  buttons -->
            <!-- <v-card-actions  v-if="movie.tickets > 0"> -->
            <v-card-actions>
              <slot></slot>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>


<script>
import { movies } from "@/service/loadAllMovies";

export default {
  data: () => ({
    loading: false,
    allMovies: [],
    items: [ "All - Default", "Action", "Drama", "Music", "Sport", "Western", "Horror",],
  }),
  methods: {
    change(genre) {
      this.loading = true
      setTimeout(() => {
         this.loading = false
      }, 2000);
      
      if (genre == "All - Default") {
        this.allMovies = movies;
      } else {
        this.allMovies = movies.filter((x) => x.genres == genre);
      }
    },
  },
};
</script>

<style>
</style>