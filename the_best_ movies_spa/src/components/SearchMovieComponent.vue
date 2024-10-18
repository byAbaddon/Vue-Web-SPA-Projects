<template>
  <div >
    <v-row v-if="activeTab == 1" class="align-center justify-center">
      <v-col cols="8" sm="8" lg="4"   class="mb-0 px-2">
        <v-text-field v-model="searchQueryByName" variant="underlined" prepend-icon="mdi-filmstrip"
         autofocus 
         label="Search by name" persistent-clear
        :rules="rulesName"
        @keyup.enter="goBtnName(searchQueryByName)"
        :hint="hintMessage"  
        :clearable="!isReadOnly" 
        :readonly="isReadOnly"
       
         />
      </v-col>
      <v-col cols="auto" class="mb-0 px-2">
        <v-btn 
        class="mb-6"
         @click="goBtnName(searchQueryByName)" :disabled="isBtnNameDisabled || isBtnGo" rounded color="primary">GO</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="activeTab == 3" class="align-center justify-center">
    
      <v-col   cols="8" sm="8" lg="3"  class="mb-0 px-2">
        <v-text-field v-model="searchQueryByYear" variant="underlined"  autofocus
          type="number" persistent-clear prepend-icon="mdi-calendar-account" label="Search by year"
          :rules="rulesYear"
          @keyup.enter="goBtnYear(searchQueryByYear)"
          :hint="hintMessage"
          :clearable="!isReadOnly" 
          :readonly="isReadOnly"
          />
      </v-col>
      <v-col cols="auto"  class="mb-0 px-2" >
        <v-btn  @click="goBtnYear(searchQueryByYear)"  :disabled="isBtnYearDisabled || isBtnGo" rounded color="primary" class="mb-6">GO</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="activeTab == 2" class="d-flex justify-center align-center">
      <v-col cols="8" sm="8" lg="3" >
        <v-select 
          variant="underlined" 
          :loading="loading"
          v-model="selectedGenre"
          :items="genreArray" 
          @update:modelValue="findByGenre(selectedGenre)"  
          color="primary"
          transition="fade"
          autofocus
          hideSelected
          :hint="hintMessage"
          prepend-icon="mdi-magnify-minus-outline"
          :menu-props="{ offsetY: true }" 
          label="Search movies by genre..."
          
        />
      </v-col>
    </v-row>

  </div>
</template>




<script setup>
import { saveDataToLocalStorage, getDataFromLocalStorage } from '@/storage/localeStorage'
import { useMoviesStore } from "@/stores/moviesStore"
import confetti from 'canvas-confetti';
import { ref, computed, watch, onMounted} from 'vue'

// Props send form search lent buttons
const props = defineProps({
  activeTab: {
    type: Number,
    required: true,
  },
})

// Store
const store = useMoviesStore()
const loading = ref(false)
const counterFindMovies = ref(0)
const searchQueryByName = ref('')
const searchQueryByYear = ref('')
const isBtnGo = ref(false)
const isReadOnly = ref(false)
const selectedGenre = ref(null)
const allMoviesFormStorage = ref([])

const genreArray = [
  "Action", "Adventure", "Animation", "Biography", "Comedy",
  "Crime", "Documentary", "Drama", "Erotic", "Family", "Fantasy", "History", "Horror",
  "Musical", "Music", "Mystery", "Noir", "Romance", "Science Fiction",
  "Sport", "Thriller", "War", "Western"
]



// enable btn GO
watch( () => props.activeTab, (newVal, oldVal) => {
  if (newVal == 0) {
    isBtnGo.value = false
    isReadOnly.value = false
    selectedGenre.value = null
    counterFindMovies.value = 0
    searchQueryByName.value = ''
    searchQueryByYear.value = ''
    try {
      // console.log('load form locale store');
       store.movies = getDataFromLocalStorage()
    } catch (error) {
      // console.log('load form base');
      
      store.loadMoviesFromStore()
    }
  } 
})

const hintMessage = computed(() => {
  return counterFindMovies.value
    ? `Searching... found ${counterFindMovies.value} movies.`
    : selectedGenre.value || searchQueryByName.value || searchQueryByYear.value
    ? 'Sorry, no movies found!' : ''

})


//Find movie by Name
const goBtnName = searchQuery => {
  if (searchQuery) {
    allMoviesFormStorage.value = getDataFromLocalStorage()
    // console.log('name Search', allMoviesFormStorage.value.length);
    
    if (!allMoviesFormStorage.value.length) {
      allMoviesFormStorage.value = store.loadMoviesFromStore()
      // console.log('name Search two method', allMoviesFormStorage.value );
    }

    const regex = new RegExp(searchQuery.replace(/\s+/g, "\\s*"), "i")
    let foundMovies = allMoviesFormStorage.value.filter(m => regex.test(m.title))
   
  if (foundMovies.length) {
      counterFindMovies.value =  foundMovies.length
      launchConfetti()
      store.movies = foundMovies
    } 
  } 
}

//Find movies by Year
const goBtnYear = (searchQuery) => {
  if (searchQuery) {
    store.loadMoviesFromStore({ filter: { year: searchQuery } });
    setTimeout(() =>  counterFindMovies.value = store.movies.length, 500)
  }
}

  
// Find movies on genre
const findByGenre =  (genre) => {
  loading.value = true
  setTimeout(() => loading.value = false, 2000)

  if (genre) {
    try {
      store.loadMoviesFromStore({ filter: { genre: genre }})
      // console.log("Loaded movies:", store.movies)
      setTimeout(() => counterFindMovies.value = store.movies.length, 500)
    } catch (error) {
      console.error('Error loading movies:', error)
    }
  
  }
}



const rulesName  = [
  (v) => !!v || "This field is required",
  (v) => (v && v.length >= 4) || "Field must be at least 4 characters",
  (v) => (v && v.length <= 50) || "Field must be no more than 50 characters",

]

const rulesYear = [
  (v) => !!v || "This field is required",
  (v) => (v && /^\d{4}$/.test(v)) || "Year must be a 4-digit number",
  (v) => (v && v >= 1900 && v <= 2100) || "Year must be between 1900 and 2100"
];

// validate fields
const isBtnNameDisabled = computed(() => {
  return !rulesName.every(rule => rule(searchQueryByName.value) == true) 
});

const isBtnYearDisabled = computed(() => {
  return !rulesYear.every(rule => rule(searchQueryByYear.value) == true)
  
});


//confetti effect
const launchConfetti = () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }, 
        //startVelocity: 30,
        //origin: { x: 0.5, y: 0.4 },
      });
    };

</script>




<style scoped>

</style>
