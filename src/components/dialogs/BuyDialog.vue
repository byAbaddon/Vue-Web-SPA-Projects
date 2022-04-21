<template>
  <v-row justify="center" >
 

    <v-dialog  max-width="320" min-height="620" v-model="dialog">

      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="buyNow"
          color="success" outlined 
          v-bind="attrs"
          v-on="on"
        >
         Buy now
        </v-btn>
      </template>



      <v-card>
        <v-card-title  class="d-flex justify-center orange indigo--text text-h5">
          BUY TICKETS
        </v-card-title>
        <hr class="mb-2">

        <v-card-text>
          Let Google  determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="red" @click="btnDisagree"> Disagree  </v-btn>
          <v-btn text  color="green" @click="btnAgree" > Agree </v-btn>
           
 
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    buyNow(e) {
      const id = e.currentTarget.parentNode.offsetParent.id;
      this.movieData = this.movies.filter((x) => x.id == id)[0];
    },

      btnAgree(){
        console.log(this.movieData.title);
    },
    btnDisagree(){
        this.dialog = false
    }
    
  },
};
</script>