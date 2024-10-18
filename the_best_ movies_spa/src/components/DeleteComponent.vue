<template>
  <div>
    <v-dialog v-model="showDeleteDialog" max-width="500" persistent>
      <v-card class="bg-grey-darken-3" variant="outlined">
        <v-card-title  class="bg-red-darken-4 text-center text-h4 " :class="titleColor" > {{ !confirmDelete ? 'CONFIRM ACTION' : 'DELETED'  }}</v-card-title>

        <v-card-text  class="bg-grey-darken-3" append-icon="mdi-check">
          <h4 class=" bg-black text-yellow body-1 text-weight-bold text-center text-uppercase py-5">
           {{ !confirmDelete ? 'Are you sure to delete' : 'Success delete'}}
            <p class="text-blue">{{ titleMovie }}</p>
            <h4 class="text-yellow text-center body-2"> From movie collections </h4>
          </h4>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="confirmDelete"  variant="elevated" color="green" text @click="confirmDialog">Yes</v-btn>
          <v-btn :disabled="confirmDelete"  variant="elevated" color="red" text @click="closeDialog">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>


<script setup>
import { useMoviesStore } from '@/stores/moviesStore';
import deleteData from '../service/deleteMovie'
import router from '@/router'
import { ref, onBeforeMount} from 'vue'

const store = useMoviesStore()


const showDeleteDialog = ref(true)
const titleColor = ref('')
const confirmDelete = ref(false)
const idMovie = ref(null)
const titleMovie = ref('')


onBeforeMount(() => {
  const {id, title} = router.currentRoute.value.query
  idMovie.value = id
  titleMovie.value = title  
})


const closeDialog = () => {
  router.push('/movies')
  showDeleteDialog.value = false
}

const confirmDialog = async () => {
  confirmDelete.value = true
  titleColor.value = 'bg-green-darken-4'
  await store.deleteMovie(idMovie.value)
  
  setTimeout(() => {
    router.push('/movies')
    // store.loadMoviesFromStore()
  }, 1000)
}


</script>


<style scoped></style>