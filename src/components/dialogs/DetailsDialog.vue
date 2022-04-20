<template>
  <v-row justify="center">
    <v-col>
    <v-dialog max-width="490" min-height="820" v-model="dialog">
      <!-- v-slot  activator-->
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
          color="warning"
          v-bind="attrs"
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
          <hr class="red" />
          <v-card-title
            class="d-flex justify-center orange white--text text-h5"
          >
            DETAILS
          </v-card-title>
          <hr class="mb-2 red" />
        </div>

        <!-- img  -->
        <v-img
          class="mx-auto  px-1"
          :src="movieData.imageUrl"
           contain
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
        <v-card-text>
          <span class="font-weight-black">Description: </span>
          {{ movieData.description }}
        </v-card-text>

        <!-- movie rating-->
        <v-card-text>
          <span class="font-weight-black">Rating: <span>({{movieData.rating}})</span>
            <v-rating
              class="float-none"
              v-model="movieData.rating"
              background-color=""
              color="yellow"
              size="20"
              :readonly="false"
            ></v-rating>
          </span>
        </v-card-text>

   <!-- movie available tickets-->
        <v-card-text>
          <div class="my-1" >
            <span class="font-weight-black mt-7 ">Available tickets: </span>
            {{ movieData.tickets}}
          </div>
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: { movies: { type: Array } },

  data: () => ({
    dialog: false,
    movieData: "",
  }),

  methods: {
    movieDetails(e) {
      const id = e.currentTarget.parentNode.offsetParent.id;
      this.movieData = this.movies.filter((x) => x.id == id)[0];
    },
  },
};
</script>