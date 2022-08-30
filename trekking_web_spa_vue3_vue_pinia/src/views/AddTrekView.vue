<script setup>
import { useTrekStore } from "../stores/treks";
import { useDataStore } from "../stores/userData";
import { addData } from "../service/addData";
import { updateData } from "../service/updateData";
import { useRouter } from "vue-router";
import { ref } from "vue";

const trekStore = useTrekStore()
const userData = useDataStore()    
const router = useRouter()

let showAlert = ref(false)
let alertType = ref('')
let message = ref('')

const onBtnAddTrek = e => {
  const [_, location, date, description, image] = e.target

  // ◦add  Organizer: string representing the current trek creator;
  // ◦add  Likes: number starting from 0;
     const newTrekObj = {
        location: location.value, imageURL: image.value, 'organizer' : userData.data.uid,
        date: date.value, description: description.value, likes: 0, voters: [], owner : userData.data.displayName
      };
            
  //check is trek in collection
        const checkIsTrekExist = trekStore.allTreks.some(x => x.location == location.value && x.image == image.value);
    
       //show message alert 
      
      if (!checkIsTrekExist) {
            addData(newTrekObj)
              .then((id) => {
                //get generated ID and add to trek object   
                updateData(id, Object.assign({}, {id} , newTrekObj))
                  .then(e => console.log('Success update and add ID'))
                  .catch(e => console.log('Fail to update' , e.error) )

                console.log("Success add new trek to collection", id)
                 showAlert.value = true;
                alertType.value = 'success'
                message.value = 'Success add new trek to collection'
                setTimeout(() => {
                  message.value = 'You will be redirect to home page...'
                }, 1500);
                setTimeout(() => {
                  router.push('/')
                }, 3000);
            
            })
            .catch((e) => {
              message.value = e
              showAlert.value = true;
          });

      } else {
         showAlert.value = true;
          message.value = "This trek, already exist!"
        
      }   

      setTimeout(() => {
        showAlert.value = false
        document.getElementById('create-form').reset()
      }, 3000);
 }
</script>



<template>
<div class="my-5 mx-auto" style="max-width: 70rem">
   <form id="create-form" class="create-trek" @submit.prevent="onBtnAddTrek" >
     <v-btn class="float-end"  variant="text" @click="router.push('/')">
        <v-icon color="red" size="30"  >mdi-window-close</v-icon>
      </v-btn>
    <div class="text-center mb-4">
      <h1 class="h3 mb-3 font-weight-normal">Wish for a new adventure!</h1>
      <p>Fill up the following information!</p>
    </div>

    <div class="form-label-group">
      <input pattern="[A-Za-z\s]{1,}\d*"    minlength="3"  type="text" name="location" class="form-control" placeholder="Location" required autofocus>
      <label for="inputTrekName">Location</label>
    </div>

    <div class="form-label-group">
      <input type="date"  name="dateTime" class=" date form-control" placeholder="Date" required>
      <label for="inputTrekDate">Date</label>
    </div>

    <div class="form-label-group" style="">
      <textarea style=""   minlength="6" maxlength="200"  type="text"  name="description" class="form-control bg-white pa-1" placeholder="Description" required></textarea>
      <label for="inputTrekDescription">Description</label>
    </div>

    <div class="form-label-group">
      <input pattern="https?:\/\/.+"   type="text" name="imageURL" class="form-control" placeholder="Image https://" required autofocus>
      <label for="inputTrekImage">Image</label>
    </div>

    <button v-if="!showAlert"  style="width:6rem"  class="btn btn-lg btn-dark btn-block" type="submit">Make</button>

  <!-- alert   -->
      <div v-else class="mx-auto">
        <v-alert     
          class="mx-auto"
          :type="alertType == 'success'? 'success' : 'error'"
        >
          {{ message }}
        </v-alert>
      </div>

  </form>
</div>

</template>

