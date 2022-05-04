<template>
 <v-dialog max-width="600" min-height="900" v-model="show">
    <!-- v-slot  activator-->
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" v-on="on" @click="btnEdit" >
        Edit
      </v-btn>
    </template>

    <div class="text-center">
       <!-- card-->
      <v-card  >
        <!-- card title-->
          <v-card-title  class="d-flex justify-center primary  white--text  pa-2">
            EDIT MOVIE
          </v-card-title>


         <!-- FORM---->
           <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="title"
                :rules="titleRules"
                label="Title"
                append-icon="mdi-alpha-t-circle-outline"
                required
              ></v-text-field>

              <v-text-field
                v-model="imageURL"
                :rules="imageRules"
                label="https://"
                append-icon="mdi-image"
                required
              ></v-text-field>

              <v-text-field
                v-model="genres"
                :rules="genresRules"
                label="Genres"
                append-icon="mdi-ninja"
                required
              ></v-text-field>

              <v-text-field
                v-model="tickets"
                :rules="ticketsRules"
                label="Tickets"
                required
                append-icon="mdi-ticket-percent-outline"
                type="number"
                min=""
              ></v-text-field>

              <v-slider
                v-model="rating"
                :rules="ratingRules"
                label="Rating"
                required
                append-icon="mdi-medal"
                min="1"
                max="6"
                :value="rating"
              >
              </v-slider>

              <v-textarea
                no-resize
                height="80"
                outlined
                required
                append-icon="mdi-book-open-variant"
                v-model="description"
                :rules="descriptionRules"
                :counter="4"
                name="i"
                label="Description"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              ></v-textarea>

              <v-btn
                :disabled="!valid ||title.length < 2 ||genres.length < 3 ||description.length < 4 ||tickets <= 0"
                color="success"
                :elevation="12"
                class="mr-4"
                @click="validate"
              >
                Add
              </v-btn>
              <v-btn :elevation="12" color="error" class="mr-4" @click="show=false"> Exit </v-btn>
            </v-form>
           </v-container>
         

 <!-- dialog success message-->
    <v-dialog v-model="showMessageDialog" dark width="500" persistent>
      <v-card>
        <v-card-text>
          <p class=" green--text body-1 text-weight-bold text-center text-uppercase pt-10 " >
            Success edit movie <span class="blue--text">{{ title }}</span>.
             </p>
            
        </v-card-text>
      </v-card>
    </v-dialog>

        </v-card>   
    </div>
  </v-dialog>
</template>

<script>
 import editData from '@/service/editData'
 import {movies} from '@/service/loadAllMovies'


export default {
  data: () => ({
    currentMovieId: '',
    show: false,
    valid: true,

    showErrorAlert: false,
    showMessageDialog: false,
    errorMessage: "",

    title: '',
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 2) || "Title must be that more 1 characters",
    ],

    imageURL: '',
    imageRules: [
      (v) => !!v || "Images is required",
      (v) =>
        (v && /https?:\/\//.test(v)) ||
        "Images must be start with http:// ot https://",
    ],

    genres: '',
    genresRules: [
      (v) => !!v || "Genres is required",
      (v) => (v && v.length >= 2) || "Genres must be that more 1 characters",
    ],

    description:'',
    descriptionRules: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length > 3) || "Description must be more than 4 characters",
    ],
    tickets: '',
    ticketsRules: [
      (v) => !!v || "Tickets is required",
      (v) => (v && v >= 0) || "Tickets count must be number bigger than -1",
    ],

    rating: '',
    ratingRules: [
      (v) => !!v || "Rating description is required",
      (v) => (v && v > 0) || "Rating is required",
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
       
          //fix input fields result
          this.title = this.title.charAt(0).toUpperCase() + this.title .slice(1)      //capitalize first letter
          this.genres = this.genres.charAt(0).toUpperCase() + this.genres .slice(1)   //capitalize first letter
          try {this.tickets = this.tickets.replace(/^0+/, '') } catch (e){''}  //remove leading zero
          
          const uid = JSON.parse(localStorage.getItem('auth')).uid
          const newMovieObj = {'creatorUid': uid , 'title': this.title, 'imageURL': this.imageURL, 'genres' : this.genres, 'description': this.description,
          'tickets': Number(this.tickets), 'rating': this.rating,}

          editData(this.currentMovieId,newMovieObj)
           .then( e => {
                 console.log('Success edit movie to collection' , e);
                 this.showMessageDialog = true
                 setTimeout(() => {
                   this.showMessageDialog = false
                  
                  this.$router.push('home')
                  setTimeout(() => { this.$router.push('factory') }, 100);//redirect  Page                  
                 }, 3500);
                     
                
          }).catch( e => {
              this.errorMessage = e
              this.showErrorAlert = true
              setTimeout( () => this.showErrorAlert = false, 3000)
              
           })

      }
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    btnEdit(e) {
       const id = e.currentTarget.parentNode.offsetParent.id
       this.currentMovieId = id

       const {title, imageUrl, genres, description, tickets, rating}=  movies.filter(x => x.id == id)[0]
       this.title = title
       this.imageURL = imageUrl
       this.genres = genres 
       this.description = description
       this.tickets = tickets
       this.rating = rating
    }, 

  }
};
</script>