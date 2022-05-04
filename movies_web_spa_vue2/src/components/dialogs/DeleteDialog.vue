<template>
<v-row>
  <v-col>
  <v-dialog max-width="500" min-height="840"  v-model="show"  >
    <!-- v-slot  activator-->
    <template v-slot:activator="{ on }">
      <v-btn outlined color="error" v-on="on" @click="btnDelete"
     
      >
        Delete
      </v-btn>
    </template>

    <div class="text-center">
      <!-- card-->
      <v-card dark>
        <!-- card title-->
        <v-card-title
          class="d-flex justify-center orange white--text text-h5 pa-2"
        >
          DELETE
        </v-card-title>

        <!-- movie title-->
        <v-card-text class=" title pb-1 mt-4">
          {{ movieData.title }}
        </v-card-text>

        <!-- img  -->
        <v-img
          dark
          class="mx-auto px-1 mt-1"
          :src="movieData.imageUrl"
          max-height="260"
          max-width="200"
          contain
        ></v-img>
        
          <!--  divider  -->
        <v-divider class="mx-12  mt-12"></v-divider>
     
       
        <!-- sheet  -->
        <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center mt-3" dark>
          <div class="body-1 mb-4">
            Are you sure you want to delete this movie?
          </div>

          <v-btn 
           @click="chanel"
           :disabled="loading" class="ma-1" color="green" plain>
            Cancel
          </v-btn>

          <v-btn
            :loading="loading"
            class="ma-1"
            color="error"
            plain
            @click="deleteMovie"
          >
            Delete
          </v-btn>
        </v-sheet>

      </v-card>
    </div>
  </v-dialog>
  </v-col>

  <v-col>

    <!-- dialog success message-->
    <v-dialog v-model="showMessageDialog" dark width="500" persistent>
      <v-card>
        <v-card-text>
          <p
            class="
              green--text
              body-1
              text-weight-bold text-center text-uppercase
              pt-10
            "
          >
            Success delete <span class="blue--text">{{ movieData.title }}</span> from movie collections.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</v-row>
</template>

<script>
import { movies } from "@/service/loadAllMovies";
import deleteData from '@/service/deleteData'

export default {
  data: () => ({
    show: false,
    showMessageDialog : false,
    loading: false,
    movieData: [],
    currentMovieToDeleteID: '',
  }),



  methods: {
    btnDelete(e) {
      this.currentMovieToDeleteID = e.currentTarget.parentNode.offsetParent.id;
      this.movieData = movies.filter((x) => x.id == this.currentMovieToDeleteID)[0];
    },
    
    chanel(){
       this.show = false
    },
   
    async deleteMovie() {
      this.showMessageDialog = true
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.showMessageDialog = false
      this.loading = false;
      this.show = false

      
      deleteData(this.currentMovieToDeleteID).then( () =>{
         console.log('Success delete movie')
        this.$router.push('home')
        setTimeout(() => { this.$router.push('factory') }, 100);//redirect  Page  
      })
  },

  }
}
</script>