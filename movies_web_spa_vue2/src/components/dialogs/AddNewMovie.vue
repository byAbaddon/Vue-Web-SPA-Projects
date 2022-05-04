 <template>
  <v-row>
    <v-col cols="12"  v-show="show" >
      <v-container class="d-flex justify-center" >
        <v-row class="my-auto">
          <v-col cols="3" class="hidden-xs-only">
            <!-- image -->
            <div class="mt-12 hidden-xs-only">
              <v-img
                src="../../assets/images/background/add_movie_two.jpeg"
                alt="registerPicture"
                style="background: linear-gradient(red 50%, 30%, blue 10%)"
                max-height="1900"
                max-width="1450"
              >
              </v-img>
            </div>
          </v-col>

          <!--form  -->
          <v-col>
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

              <!-- <v-btn :elevation="12" color="error" class="mr-4" @click="reset"> Reset </v-btn> -->
               <v-btn :elevation="12" color="error" class="mr-4" @click="exit"> Exit </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col>
      <!-- alert   -->
      <div class="mx-auto">
        <v-alert
          class="mx-auto"
          height="50"
          width="47em"
          type="error"
          icon="mdi-alert"
          v-show="showErrorAlert"
        >
          {{ errorMessage }}
        </v-alert>
      </div>
    </v-col>


 <!-- dialog success message-->
    <v-dialog v-model="showMessageDialog" dark width="500" persistent>
      <v-card>
        <v-card-text>
          <h4
            class="
              green--text
              body-1
              text-weight-bold text-center text-uppercase
              pt-10
            "
          >
            Success add movie the <span class="blue--text">{{ title }}</span> to collection
            <h5 class="yellow--text text-center body-2">    You will be redirect to movies page    </h5>
           </h4>
            
        
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-row>
</template>



<script>
import addData from '@/service/addData'
import {movies} from '@/service/loadAllMovies'


export default {
  data: () => ({
    show:true,
    valid: true,

    showErrorAlert: false,
    showMessageDialog: false,
    errorMessage: "",

    title: "E.T.",
    titleRules: [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 2) || "Title must be that more 1 characters",
    ],

    imageURL:
    'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/eb52b672e355462e265523ec82decc7f_480x.progressive.jpg?v=1573572677',
    imageRules: [
      (v) => !!v || "Images is required",
      (v) =>
        (v && /https?:\/\//.test(v)) ||
        "Images must be start with http:// ot https://",
    ],

    genres: "Action",
    genresRules: [
      (v) => !!v || "Genres is required",
      (v) => (v && v.length >= 2) || "Genres must be that more 1 characters",
    ],

    description:
      "The third installment of  which follows the continuing adventures of Newt Scamander.",
    descriptionRules: [
      (v) => !!v || "Description is required",
      (v) =>
        (v && v.length > 3) || "Description must be more than 4 characters",
    ],
    tickets: 1,
    ticketsRules: [
      (v) => !!v || "Tickets is required",
      (v) => (v && v >= 0) || "Tickets count must be number bigger than -1",
    ],

    rating: "4",
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
          const newMovieObj = {'creatorUid': uid , 'title': this.title, 'imageUrl': this.imageURL, 'genres' : this.genres, 'description': this.description,
          'tickets': Number(this.tickets), 'rating': this.rating,}
          

           //check is movie in collection
           const checkIsMovieExist =  movies.some(x=> x.title == this.title && x.imageUrl == this.imageURL)
           console.log(checkIsMovieExist);

           addData(newMovieObj)
           .then( e => {
                 console.log('Success add new movie to collection' , e);
                 this.showMessageDialog = true
                 setTimeout(() => {
                   this.showMessageDialog = false
                      this.$router.push('movies')  //redirect ot movies Page   TODO
                    }, 3500);
                     
                
          }).catch( e => {
              this.errorMessage = e
              this.showErrorAlert = true
              setTimeout( () => this.showErrorAlert = false, 3000)
              
           })

      }
    },
    reset() {
      try { this.$refs.form.reset() } catch (error) { '' }
    },

    exit() {
      this.show = false
      this.$router.push('home')
      setTimeout(() => { this.$router.push('factory') }, 100);
    }, 
     
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },


};
</script>
