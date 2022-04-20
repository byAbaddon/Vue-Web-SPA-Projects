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
          <div class="ml-8 body-1">Available tickets: {{ movie.tickets }}</div>
        </v-card-text>

        <!--  buttons -->
        <v-card-actions class="ml-7">
          <buy-dialog class="mr-7" :movies="allMovies" />    
          <details-dialog class="mb-3"  :movies="allMovies" />
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col> </v-col>
  </v-row>
</template>

<script>
import getAllMoviesFromBase from "@/service/loadAllMovies";
import BuyDialog from "@/components/dialogs/BuyDialog";
import DetailsDialog from "@/components/dialogs/DetailsDialog";

export default {
  components: {
    BuyDialog,
    DetailsDialog,
  },

  data: () => ({
    allMovies: [],
  }),

  methods: {},

  created() {
    getAllMoviesFromBase().then((m) => (this.allMovies = m));
  },
};
</script>





    








  



