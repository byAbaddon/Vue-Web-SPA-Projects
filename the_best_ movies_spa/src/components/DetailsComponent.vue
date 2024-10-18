<template>
  <div class="d-sm-none">

    <v-dialog v-model="modelDialog" fullscreen>

      <v-row noGutters class="d-flex justify-center align-center"
        style="max-height: 100vh; overflow-y: auto;  overflow-x: hidden; ">

        <v-col cols="12" md="3" class=" bg-grey-darken-4" alignSelf="stretch">

          <div>
            <h4 class="t-color text-center text-white bg-grey-darken-2 pb-1">{{ titleEn }}</h4>
          </div>
          <v-img lazy-src="/assets/images/imageNotFound.png" aspect-ratio="0" :src="movie.imageUrl"
            style="border: 2px solid grey ; margin-bottom:-22px" cover>
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="red" bg-color="black" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>

        </v-col>

        <v-col cols="12" md="6" alignSelf="stretch">
          <v-card class="" color="grey-darken-4" style="height: 100%;">
            <template v-slot:loader="{ isActive }">
              <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

              <h4 class="t-color  text-center bg-grey-darken-3 pb-2">{{ titleBg }}</h4>

            <v-card-item class=" bg-grey-darken-4 ">

              <v-row class=" d-flex justify-space-evenly  align-space-around ">
                <v-col  class="bg-grey-darken-4">
                  <v-chip class="ma-2" color="" prepend-icon="mdi-flag-outline"> <span>Country:</span>&nbsp;{{ movie.country }}</v-chip>
                </v-col>
                <v-col class="bg-grey-darken-4">
                  <v-chip class="ma-2" color="" prepend-icon="mdi-calendar"> <span>Year:</span>&nbsp;{{ movie.year }}</v-chip>
                </v-col>
                <v-col class="bg-grey-darken-4">
                  <v-chip class="ma-2" color="" prepend-icon="mdi-clock-outline"> <span>Time:</span>&nbsp; {{ movie.time }}</v-chip>
                </v-col>
              </v-row>

              <v-divider class=""></v-divider>
              <v-chip class="ma-2" color="" prepend-icon="mdi-account-tie"><span>Director:</span>&nbsp;{{ movie.director }} </v-chip>
              <v-rating class="float-right bg-grey-darken-3 mt-3 mr-3" :model-value="5" color="amber" density="compact"
                size="small"></v-rating>

              <v-divider class=""></v-divider>
              <v-chip class="ma-2" color="" prepend-icon="mdi-ninja"><span>Genre:</span>&nbsp;{{ genres }} </v-chip>


              <v-divider class=""></v-divider>
              <v-chip class="ma-2" color="" prepend-icon="mdi-star"><span>Actors:</span>&nbsp;</v-chip>
              <v-chip class="ma-2" color="" style="white-space: normal; width: 100%; height: 100%; border-radius:0">{{
      movie.actors }}</v-chip>

              <v-divider class=""></v-divider>
              <v-chip class="ma-2" color="" prepend-icon="mdi-book-open-variant"><span>Description:</span>&nbsp; </v-chip>
              <v-chip class="ma-2" color="" style="white-space: normal; width: 100%; height: 100%; border-radius:0">{{
      movie.description }}</v-chip>

              <v-divider class=""></v-divider>
              <v-chip class="ma-2" color="" prepend-icon="mdi-link-box-outline"><span>Link TMDB:</span>&nbsp;</v-chip>
              <v-btn icon="mdi-share" size="25" color="primary" target="_blank"
               :href="movie.tmdbURL"> </v-btn>
              <v-divider class=""></v-divider>

              <v-chip class="ma-2" color="" prepend-icon="mdi-video-outline">
                <span>PlayTrailer:</span>&nbsp;</v-chip>
              <v-btn 
               icon="mdi-play"
               size="25"
               color="red"
               @click="playTrailer(movie.trailer)" >
              </v-btn>

            </v-card-item>

            <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions class="justify-center bg-grey-darken-4">
              <v-btn  variant="outlined" color="red-lighten-2" @click="close"  width="150"    >Close</v-btn>
            </v-card-actions>

          </v-card>

        </v-col>

      </v-row>


      <v-dialog v-model="iframeDialog"
        :max-width="isMobile ? '90%' : '50%'"
        :max-height="isMobile ? '90%' : '90%'"
        persistent>
        <v-card class="bg-black">
          <v-card-text>
            <iframe
              :src="trailerUrl"
              width="100%"
              :height="isMobile ? '300' : '400'"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              :allowfullscreen="isMobile ? false : true"  
              >
            ></iframe>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" variant="flat" class="mx-auto"
             @click="iframeDialog = false">Close</v-btn>
             <!-- <span class="color-white">You watch trailer : {{ movie.title }}</span> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      


    </v-dialog>
  </div>
</template>



<script setup>
import { ref, onBeforeMount, computed, } from "vue"
import { getDataFromLocalStorage } from '@/storage/localeStorage'
import router from "@/router"
import { useMoviesStore } from '@/stores/moviesStore'
import { useDisplay } from 'vuetify';

const store = useMoviesStore()
const movie = ref('')
const modelDialog = ref(true)
const iframeDialog = ref(false)
const titleEn = ref('')
const titleBg = ref('')
const genres = ref('')
const { xs } = useDisplay();



onBeforeMount(async () => {
  const id = router.currentRoute.value.query.id
  // movie.value =  getDataFromLocalStorage('dataMovies').filter(m => m.id == id)[0]
  movie.value = await store.getMovieById(id)
  genres.value = movie.value.genre.join(', ')
  let t = movie.value.title.split('/').map(x => x.trim())
  titleEn.value = t[0]
  titleBg.value = t[1]
})



const playTrailer = (e) => {
  iframeDialog.value = true
  console.log(e)

}

const trailerUrl = computed(() => {
  if (movie.value.trailer.includes('https://youtu.be/')) {
    const videoId = movie.value.trailer.split('https://youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return movie.value.trailer;
});




const close = () => {
  router.push('/movies')
  modelDialog.value = false
}

const isMobile = computed(() => xs.value);



</script>







<style scoped>
.wrap-text {
  white-space: normal;
  word-break: break-word;
  text-align: center;
}

div {
  background: rgba(2, 2, 2, 0.212)
}

span.v-chip  ::before {
  color:cornflowerblue;
}



span.v-chip span{
  color:lightsteelblue;
}

.t-color{
color:lavender;
}
</style>
