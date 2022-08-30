<script setup>
import { useDataStore } from "@/stores/userData";
import { useTrekStore } from "../stores/treks.js";
import { useRouter } from "vue-router";

const trekStore = useTrekStore()    
const userData = useDataStore()
const router = useRouter()

let treksOwners = trekStore.allTreks
.filter(x => userData.data.uid == x.organizer)
.map(x => x.location).sort((a, b) => a.localeCompare(b)) 

  
</script>

<template>
  <div>
     <div class="profile col-md-6 text-center col-lg">
      <div>
         <v-btn class="float-end mr-n5"  variant="text" @click="router.push('/')">
        <v-icon color="red" size="30">mdi-window-close</v-icon>
      </v-btn>
      </div>
      
    <img  style="border-radius:6px"  class="profile-img ml-12" alt="Avatar" :src="userData.data.photoURL"/>
   
    <div class="profile-info">
      <p>Username: <span class="text-red-darken-4">{{userData.data.displayName}}</span></p>
      <p class="infoType">Wished <span class="text-brown-darken-2" >({{treksOwners.length}})</span> treks list:</p>
        <div v-if="treksOwners.length">
          <ul v-for="(trek, index) in treksOwners" :key="index"   style="list-style-type: none;">
            <li :class="!(index & 1) ? 'text-yellow-darken-4' : 'text-indigo'" >
              {{trek}}
            </li>
          </ul>
           </div>
          <div v-else>
             <p   class="text-red">You, No treks yet!</p>
          </div>
    </div>
  </div>
  </div>
</template>

 