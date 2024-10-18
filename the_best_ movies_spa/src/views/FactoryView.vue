<template>
  <div class="">
    <div>
      <v-card 
      class="mx-auto mt-2  border"
      elevation="6"
      title="WELCOME TO FACTORY PAGE"
      subtitle="FILL ALL REQUIRED FIELDS AND PRESS [ADD]"
      :color="changeColor"
      :image="changeImage"
      max-width="99%"
      style="">
    
      <v-radio
        v-model="isActive"
        label="Change theme"
        @click="handleRadioClick"
      ></v-radio>

      <AddNewMovieComponent />

      </v-card>
<!-- 
      <div class="text-center mx-auto">
        <img class="text-center ma-1" position="center" height="80"
         src="/assets/images/factory1.png"
         alt="pic" />
      </div> -->

    </div>

  </div>
</template>

<script setup>

import AddNewMovieComponent from '../components/AddNewMovieComponent.vue'
import { useMoviesStore } from '../stores/moviesStore'
import { ref, onBeforeMount,} from 'vue'

const store = useMoviesStore()
const isActive = ref(false)  
const changeColor = ref('')
const changeImage = ref('')
// const idMovieToEdit = ref('null')

// onBeforeMount(() => {
//   idMovieToEdit.value = router.currentRoute.value.query.id 
// })


const handleRadioClick = () => {
  isActive.value = !isActive.value 
  changeColor.value = changeColor.value !== '' ? '' : "surface-variant" 
  changeImage.value = changeImage.value !== '' ? '' : "https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
}

</script>








<style scoped>

</style>