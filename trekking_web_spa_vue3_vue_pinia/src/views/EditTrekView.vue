<script setup>
import { useTrekStore } from "../stores/treks";
import { useRouter, useRoute } from "vue-router";
import { updateData } from "../service/updateData";
import { ref } from "vue";

const trekStore = useTrekStore();
const router = useRouter();
const routeTrekId = useRoute().params.id
let { organizer, id, imageURL, date, description, location, owner, likes, voters } = trekStore.allTreks.find((x) => x.id == routeTrekId)
let currentLikes = ref(likes)

let showAlert = ref(false)
let alertType = ref('')
let alertMessage = ref('')

const onBtnAddTrek = () => {
 let form = new FormData(document.getElementById('edit'))
  const location = form.get('location')
  const date = form.get('dateTime')
  const description = form.get('description')
  const imageURL = form.get('imageURL')
  const likes = Number(form.get('likes'))
  
  updateData(id, { organizer, id, imageURL, date, description, location, owner, likes, voters } )
    .then(e => {
      currentLikes.value = likes
      showAlert.value = true
      alertType.value = 'success'
      alertMessage.value = 'Success edit the trek'
    }).catch(e => {
      console.log(e.error)
      showAlert.value = true
      alertType.value = 'error'
      alertMessage.value = 'Fail to edit the trek!'
    })
    setTimeout(() => alertMessage.value = 'You will be redirect to home page...', 2000)
    setTimeout(() => alertMessage.value = router.push('/'), 3000)
 
}

</script>

<template>
 <div class="my-5 mx-auto" style="max-width: 70em; min-width: 23em;">
    <form id="edit" class="create-trek" @submit.prevent="onBtnAddTrek">
      <div style="margin:0 92%">
          <v-btn class="float" variant="text" @click="router.push('/')">
           <v-icon color="red" size="30">mdi-window-close</v-icon>
         </v-btn>
      </div>
    
      <div class="form-label-group text-center">
        <input
          pattern="[A-Za-z\s]{1,}\d*"  
          type="text"
          name="location"
          class="form-control"
          placeholder="Location"
          required=""
          autofocus=""
          :value="location"
        />
        <label for="inputTrekName">Location</label>
      </div>

      <div class="form-label-group">
        <input
          type="date"
          name="dateTime"
          class="form-control"
          placeholder="Date"
          required
          :value="date"
        />
        <label for="inputTrekDate">Date</label>
      </div>

      <div class="form-label-group">
        <textarea
          minlength="6"
          maxlength="200" 
          type="text"
          name="description"
          class="form-control bg-white"
          placeholder="Description"
          required
          :value="description"
        ></textarea>
        <label for="inputTrekDescription">Description</label>
      </div>

      <div class="form-label-group">
        <input
          pattern="https?:\/\/.+"  
          type="text"
          name="imageURL"
          class="form-control"
          placeholder="Image"
          required
          autofocus
          :value="imageURL"
        />
        <label for="inputTrekImage">Image</label>
      </div>
       
       <div class="form-label-group">
        <input
          type="number"
          min="0"
          max="100"
          name="likes"
          class="form-control text-center"
          required
          autofocus
          :value="currentLikes"
        />
        <label for="likes">Likes</label>
      </div>
       
      <button v-if="!showAlert" class="btn btn-lg btn-dark btn-block text-white" type="submit">
        Edit the trek
      </button>

      <!-- alert   -->
         <div v-else class="mx-auto">
            <v-alert     
              class="mx-auto"
              :type="alertType == 'success'? 'success' : 'error'"
            >
              {{ alertMessage }}
            </v-alert>
          </div>
    </form>
  </div>
</template>

