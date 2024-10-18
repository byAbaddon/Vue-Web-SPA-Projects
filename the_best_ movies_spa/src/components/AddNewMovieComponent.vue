<template>
  <v-row>
    <v-col cols="12" v-show="show">
      <v-container class="d-flex justify-center">
        <v-row class="my-auto">
          <v-col cols="3" class="d-none d-md-block">
            <!-- image -->
            <div >
              <v-img :src="imageURL || defaultImageURL" alt="registerPicture"
              style="background: linear-gradient(red 50%, 30%, blue 10%)" max-height="1900" max-width="1450">
            </v-img>  
            </div>
          </v-col>

          <!--form  -->
          <v-col>
            <v-form ref="form" v-model.trim="valid" lazy-validation>
             <!-- image -->
              <div v-if="xs"  class="small-screen">
                <v-img :src="imageURL || defaultImageURL" alt="registerPicture">
              </v-img>
              </div>

              <v-text-field  v-for="(item, index) in itemFields" :key="index" v-model="item.model" :rules="commonRules"
               :type="item.type || ''" :label="item.label" :append-icon="item.icon" required variant="underlined" clearable
               style=""
               ></v-text-field>

              <v-textarea variant="outlined" label="Description" clearable required append-icon="mdi-book-open-variant"
                auto-grow v-model="description" :counter="3000" maxlength="3000" :rules="commonRules"></v-textarea>

              <v-btn v-show="!movieEditID" :disabled="!valid" color="success" :elevation="12" class="mr-4"
                @click="addBtn">Add</v-btn>

              <v-btn v-show="!movieEditID" :elevation="12" color="error" class="mr-4"
               @click="reset"> Reset </v-btn>

              <v-btn v-show="movieEditID" :disabled="!valid" :elevation="12" color="pink" class="mr-4"
               @click="editMovieBtn"> Done </v-btn>

              <v-btn :elevation="12" color="primary" class="mr-4"
               @click="exitBtn"> Exit </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col>
      <!-- alert   -->
      <div class="mx-auto">
        <v-alert class="mx-auto" height="50" width="47em" type="error" icon="mdi-alert" v-show="showErrorAlert">
          {{ errorMessage }}
        </v-alert>
      </div>
    </v-col>


    <!-- dialog add success message-->
    <v-dialog v-model="showMessageDialog" width="500" persistent>
      <v-card>
        <v-card-text class="bg-grey-darken-4">
          <v-container v-if="!movieEditID">
             <h4 class=" bg-black text-green body-1 text-weight-bold text-center text-uppercase py-5">
                 Тhe movie was successfully added:
             <p class="text-blue">{{ title }}</p>
            <h5 class="text-yellow text-center body-2"> Add another awesome movie... </h5>
          </h4>
          </v-container>
          <v-container v-else>
            <h4 class=" bg-black text-green body-1 text-weight-bold text-center text-uppercase py-5">
                Edit the movie was successfully:
           <h5 class="text-yellow text-center body-2"> You will be redirect... </h5>
         </h4>
         </v-container>
         
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRedirectDialog" width="400" persistent>
           <v-card loading border elevation class="bg-grey-darken-4 text-center">
            <v-card-title class="">
                  REDIRECT PLEASE WAIT...
            </v-card-title>
           </v-card>
    </v-dialog>


  </v-row>
</template>





<script setup>
import router from "@/router"
import { useMoviesStore } from '../stores/moviesStore'
import { useDisplay } from 'vuetify';
import { ref, nextTick, onMounted} from 'vue'

const store = useMoviesStore()

const { xs } = useDisplay();


 //get id movie to edit
const movieEditID = ref(null)

const defaultImageURL = ref("/assets/images/add_movie_two.png")

const form = ref(null)
const show = ref(true)
const valid = ref(false)

const showErrorAlert = ref(false)
const showMessageDialog = ref(false)
const errorMessage = ref('')
const showRedirectDialog = ref(false)

const title = ref('')
const imageURL = ref('')
const genre = ref([])
const director = ref('')
const country = ref('')
const actors = ref('')
const time = ref('')
const tmdbURL = ref('')
const trailer = ref('')
const year = ref('')
const description = ref('')
const createdAt = ref('')


onMounted(async () => {    // if edit
  movieEditID.value = router.currentRoute.value.query.id  
  
  if (movieEditID.value) {
    const movie =  await store.getMovieById(movieEditID.value) 
    if (movie) {
      title.value = movie.title
      imageURL.value = movie.imageUrl
      genre.value = movie.genre.join(', ')
      director.value = movie.director
      country.value = movie.country
      actors.value = movie.actors
      time.value = movie.time
      tmdbURL.value = movie.tmdbURL
      trailer.value = movie.trailer
      year.value = movie.year
      description.value = movie.description
    }

  }
})


const commonRules = [
  (v) => !!v || "This field is required",
  (v) => (v && v.length >= 3) || "Field must be at least 3 characters",
  (v) => (v && v.length < 3000) || "Field must be no more than 3000 characters",
]


const itemFields = ref([
  { label: 'Title', model: title, icon: 'mdi-information' },
  { label: 'ImgUrl', model: imageURL, icon: 'mdi-image-frame' },
  { label: 'Genre', model: genre, icon: 'mdi-ninja' },
  { label: 'Director', model: director, icon: 'mdi-account-circle-outline' },
  { label: 'Country', model: country, icon: 'mdi-flag' },
  { label: 'Actors', model: actors, icon: 'mdi-star-outline' },
  { label: 'Time', model: time, icon: 'mdi-clock' },
  { label: 'TmdbURL', model: tmdbURL, icon: 'mdi-home-outline' },
  { label: 'Trailer', model: trailer, icon: 'mdi-video' },
  { label: 'Year', model: year, icon: 'mdi-calendar' , type : 'number'},
])


const addBtn = async () => {
  if (form.value.validate()) {
    // title.value = title.value.charAt(0).toUpperCase() + title.value.slice(1)
    // genre.value = genre.value.charAt(0).toUpperCase() + genre.value.slice(1)

    const uid = null
    const newMovieObj = {
      creatorUid: uid,
      title: title.value,
      imageUrl: imageURL.value,
      genre: genre.value.split(',').map(g=> g.trim()),
      director: director.value,
      country: country.value,
      actors: actors.value,
      time: time.value,
      tmdbURL: tmdbURL.value,
      trailer: trailer.value,
      year: year.value,
      description: description.value,
      createdAt: createdAt.value
    }

    const checkIsMovieExist = store.movies.some(x => x.title == title.value && x.imageUrl == imageURL.value)
    
    
    if (!checkIsMovieExist) {

      // console.log('form ', newMovieObj);
      try {
        await store.addMovie(newMovieObj)
        showMessageDialog.value = true

        setTimeout(async () => {
          showMessageDialog.value = false
          await nextTick()
          window.scrollTo(0, 0)
          form.value.reset() //clear form automatic
        }, 2000)
      } catch (e) {
        errorMessage.value = e
        showErrorAlert.value = true
        setTimeout(() => (showErrorAlert.value = false), 1500)
      }
    } else {
      errorMessage.value = "Movie already exists"
      showErrorAlert.value = true
      setTimeout(() => (showErrorAlert.value = false), 1500)
    }
  }
}


const editMovieBtn = async () => {
  if (form.value.validate()) {
    const uid = null
    const newMovieObj = {
      creatorUid: uid,
      title: title.value,
      imageUrl: imageURL.value,
      genre: genre.value.split(',').map(g=> g.trim()),
      director: director.value,
      country: country.value,
      actors: actors.value,
      time: time.value,
      tmdbURL: tmdbURL.value,
      trailer: trailer.value,
      year: year.value,
      description: description.value,
      createdAt: createdAt.value
    }

    try {
      await store.editMovie(movieEditID.value, newMovieObj)
      showMessageDialog.value = true

      setTimeout(async () => {
        await nextTick()
        window.scrollTo(0, 0)
        showMessageDialog.value = false
        form.value.reset() //clear form automatic
        router.push('/movies')
      }, 2000)
    } catch (e) {
      errorMessage.value = e
      showErrorAlert.value = true
      setTimeout(() => (showErrorAlert.value = false), 1500)
    }
  } else {
    errorMessage.value = "Movie was edit success"
    showErrorAlert.value = true
    setTimeout(() => (showErrorAlert.value = false), 1500)
  }
}



const exitBtn = () => {
  show.value = false
  showRedirectDialog.value = true
  setTimeout(() => router.push('/movies'),600)
}


const reset = () => {
  // const form = ref(null)
  form.value.reset()
}


const resetValidation = () => {
  const form = ref(null)
  form.value.resetValidation()
}

</script>


<style scoped>
.small-screen{
    position: relative;
    left: 1.6em;
    top: -1em;
    max-width: 70px;
    max-height: 100px;
}


</style>