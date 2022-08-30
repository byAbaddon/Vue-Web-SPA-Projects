<script setup>
import { useDataStore } from "../stores/userData";
import { useTrekStore } from "../stores/treks";
import { updateData } from "../service/updateData";
import { deleteData } from "../service/deleteData";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const trekStore = useTrekStore();
const userData = useDataStore();
const router = useRouter();
const routeTrekId = useRoute().params.id;
let { organizer, id, imageURL, date, description, location, owner, likes, voters } = trekStore.allTreks.find((x) => x.id == routeTrekId);
let currentLikes = ref(likes);
let typeMessage = ref("");
let messageAlert = ref("");
let confirmDialog = ref(false)
let messageConfirm = ref('Are you sure to want to delete this trek ?')
let hideBtn = ref(true)

const onBtnExit = () => router.go(-1);

const onBtnEdit = (e) => router.push({name:'editTrek' , params:{id}})


const onBtnDelete = () => confirmDialog.value = true


const onDeleteTrek = () => {
   deleteData(id)
     .then(() => {
       console.log('The trek was deleted success')
      messageConfirm.value = 'The trek was deleted success!'
       hideBtn.value = false
       setTimeout(() => {
        confirmDialog.value = false
        router.push('/') 
      }, 2000);

    })
    .catch(e => console.log(e.error))
}


const onBtnLike = (e) => {
  //checking if he has already in liked list

  let check = voters.includes(userData.data.uid);
  if (!check) {
    typeMessage.value = "success";
    messageAlert.value = 'Thank for you like!'
    currentLikes.value++;
    likes += 1;
    voters.push(userData.data.uid);
    updateData(routeTrekId, { organizer, id, imageURL, date, description, location, owner, likes, voters, })
      .then((e) => console.log("Success update"))
      .catch((e) => console.log(e.error));
    
  } else {
    typeMessage.value = "error";
    messageAlert.value = "You already liked this trek!"
    console.log("You already liked this trek!");
  }
  setTimeout(() => {
    typeMessage.value = messageAlert.value = "";
  }, 2000);
};
</script>

<template>
  <div style="width: 72%; min-width: 23em;  margin: 0 auto; margin-top: 1em; margin-bottom: 2em">
    <div class="row single-trek-details text-center">
      <div class="col-md-12 text-center overflow-hidden">
        <img class="details-img" style="border-radius: 6px; min-width: 10em" :src="imageURL" />
        <div class="overflow-hidden my-3 p-3">
          <h2 class="display-5">{{ location }}</h2>
          <p class="infoType">Description:</p>
          <p class="trek-description">{{ description }}</p>
          <p class="infoType">
            Date: <span>{{ date }}</span>
          </p>
          <p class="infoType">
            Likes: <span>{{ currentLikes }}</span>
          </p>
          <p class="infoType">
            Organizer: <span>{{ owner }}</span>
          </p>
        </div>

        <!-- check is owner--->
        <div v-if="organizer == userData.data.uid" class="buttons-together">
          <div v-if="!typeMessage">
            <v-btn @click="onBtnEdit" variant="outlined">
              Edit the trek
              <v-icon color="black-darken-3" size="18">
                mdi-hammer-screwdriver</v-icon
              >
            </v-btn>

            <v-btn class="mx-4 my-2" @click="onBtnDelete" variant="outlined">
              Delete the trek
              <v-icon color="red-darken-3" size="18"> mdi-close-circle </v-icon>
            </v-btn>
            <v-btn @click="onBtnExit" variant="outlined">
              Exit
              <v-icon color="blue-darken-3" size="18"> mdi-exit-run</v-icon>
            </v-btn>
          </div>

          <div v-else>
            <v-alert :type="typeMessage">Thank you for like!</v-alert>
          </div>
        </div>

        <!-- no owner  able to make like -->
        <div v-else>
          <div v-if="!typeMessage">
            <v-btn class="mr-1" @click="onBtnLike" variant="outlined">
              Like
              <v-icon color="yellow-darken-3" size="18"> mdi-heart</v-icon>
            </v-btn>
            <v-btn @click="onBtnExit" variant="outlined">
              Exit
              <v-icon color="blue-darken-3" size="18"> mdi-exit-run</v-icon>
            </v-btn>
          </div>

          <div v-else>
            <v-alert :type="typeMessage">{{messageAlert}}</v-alert>
          </div>
        </div>
      </div>
    </div>
     <!-- delete dialog confirm -->          
          <div class="text-center">
              <v-dialog
           
              transition="dialog-top-transition"
                v-model="confirmDialog"
                activator="parent"
              >
                <v-card>
                  <v-card-text class="bg-black text-white font-italic">
                   {{messageConfirm}}
                  </v-card-text >
                  <v-card-actions class="bg-black d-flex justify-space-around ">
                    <v-btn  v-show="hideBtn"  variant="flat" color="green"   @click="onDeleteTrek">Yes</v-btn>
                    <v-btn  v-show="hideBtn"  variant="flat" color="error"  @click="confirmDialog=false">No</v-btn>
                    <v-icon color="red" v-show="!hideBtn">mdi-trash-can-outline</v-icon>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </div>

  </div>
</template>