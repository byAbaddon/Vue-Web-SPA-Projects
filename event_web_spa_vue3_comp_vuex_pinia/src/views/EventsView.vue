<template>
  <div>
<!-- text row one--> 
    <div class="mt-4 d-flex justify-space-around">
      <h3 class="title mt-2 pa-2 text-center text-blue">
        {{
          `${
            !userDataStore.isAuth ? "Cannot find any event..." : "Organize New Event"
          }`
        }}
        <span>
          <v-btn
            class=""
            color="red"
            variant="outlined"
            size="small"
            to="/events/add"
          >
            {{ `${!userDataStore.isAuth ? "Create first" : "Create"}` }}</v-btn
          >
        </span>
      </h3>
    </div>

<!-- text row two-->
      <div class="text-center text-lime-darken-1 mt-6"> Total Events numbers:
         <span class="text-red">{{eventStore.allEvents.length ? eventStore.allEvents.length : 0}}</span>
          <v-btn
           min-width="90"
           @click="onChangeEvents"
           class="ml-2 " size="small" with="11"  :color="`${eventOwner == 'all' ? 'blue-darken-4':'teal-darken-3'}`">{{eventOwner}}</v-btn>
        </div>
    

    <!-- list of events -->
    <div>
      <v-row class="d-flex align-center ma-4 mt-0">
        <v-col v-for="(event, index) in eventStore.allEvents" :key="index">
          <v-card
            class="mx-auto bg-grey-darken-3 mt-12"
            min-width="300"
            max-width="300"
          >
            <v-card-title class=""
              ><span class="mx-auto">{{ event.title }}</span></v-card-title
            >
            <v-img :src="event.image" height="200" cover></v-img>

            <v-card-subtitle> </v-card-subtitle>

            <v-card-actions>
              <p class="text-body-2 ml-2">Click button to see...</p>
              <v-spacer></v-spacer>

              <!-- dialog-->
              <v-row justify="center">
                <v-dialog
                  transition="dialog-center-transition"
                  v-model="dialog"
                  max-width="600"
                  max-height="600"
                  class="bg-grey-darken-3" 
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      :id="index"
                      width="100"
                      class="bg-success"
                      color="white"
                      prepend-icon="mdi-swap-vertical-bold"
                      @click="showMoreDetails(event.id)"
                      >More
                    </v-btn>
                  </template>

                
                    <v-card-title class="mx-auto mb-8 text-decoration-underline">  {{currentEventData.title}} </v-card-title>
                    <v-img :src="currentEventData.image" width="400"   height="200" cover  class="mx-auto" ></v-img>
                    <v-divider></v-divider>

                    <v-card-text>
                      <h3 class=" mb-1 text-decoration-underline">
                        Description:
                      </h3>
                      <p class="text-teal"  >{{ currentEventData.description }}</p>
                      <h3 class=" mb-1 text-decoration-underline">
                        Date:
                        <span class="font-weight-light text-teal">
                          {{ currentEventData.date }}</span
                        >
                      </h3>
                      <h3 class=" mb-1 text-decoration-underline">
                        People interested in:
                        <span class="font-weight-light text-teal">{{
                          currentEventData.people
                        }}</span>
                      </h3>
                      <h3 class=" mb-1 text-decoration-underline">
                        Organizer:
                        <span class="font-weight-light text-teal">
                          {{ userDataStore.data.displayName }}</span
                        >
                      </h3>
                    </v-card-text>

                    <v-card-actions class="d-flex justify-space-around">
                      
                      <v-btn
                        v-show="eventOwnerUid != currentEventData.organizer"
                        class="bg-primary pa-2 mr-12"
                        rounded="4"
                        append-icon="mdi-thumb-up"
                        color=""
                        variant="outlined"
                        @click="joinTheEvent(currentEventData.id)"
                      >
                        Join the event
                      </v-btn>
                    
                
                      <v-btn
                        v-show="eventOwnerUid == currentEventData.organizer"
                        class="bg-warning pa-2"
                        rounded="4"
                        append-icon="mdi-square-edit-outline"
                        color=""
                        variant="outlined"
                        @click="editEvent"
                        :to="{ name: 'edit', params: { id: currentEventData.id }}"
                        >Edit event
                      </v-btn>
                    
                       <v-btn
                        v-show="eventOwnerUid == currentEventData.organizer"
                        class="bg-error pa-2"
                        rounded="4"
                        append-icon="mdi-delete"
                        variant="outlined"
                        @click="onDeleteEventDialog"
                        >Delete event
                      </v-btn>

                         <v-btn 
                         width="100"
                        class="bg-success pa-2"
                        rounded="4"
                        append-icon="mdi-exit-run"
                        variant="outlined"
                        @click="dialog = false"
                        >Exit
                      </v-btn>

                    </v-card-actions>

                <!-- delete dialog confirm -->          
                   <div class="text-center">
                       <v-dialog
                       transition="dialog-top-transition"
                         v-model="confirmDialog"
                         activator="parent"
                       >
                         <v-card>
                           <v-card-text class="text-black font-italic">
                            {{deleteEventMessage}}
                           </v-card-text>
                           <v-card-actions class="d-flex justify-space-around ">
                             <v-btn v-show="hideBtn" color="error "  @click="confirmDialog = false">No</v-btn>
                             <v-btn v-show="hideBtn" color="green"   @click="[ deleteEvent(currentEventData.id)]" >Yes</v-btn>
                           </v-card-actions>
                         </v-card>
                       </v-dialog>
                   </div>

                  <v-card-text v-show="true" class="mx-auto mt-2 text-yellow" >{{likeMessage}}</v-card-text>
                
                </v-dialog>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref, } from "vue";
import { deleteData } from "@/service/deleteData";
import { updateData } from "@/service/updateData";
import { useDataStore } from "@/stores/userData";
import { useEventStore } from "@/stores/events";
import {  useRouter } from "vue-router";


let router = useRouter()
const userDataStore = useDataStore()
const eventStore = useEventStore()

onMounted(() =>  eventStore.updateEvents())


const eventOwnerUid = ref(JSON.parse(localStorage.getItem("auth")).uid);
let dialog = ref(false);
let confirmDialog = ref(false)
let currentEventData = ref('')
let deleteEventMessage = ref('Are you sure to want to delete this event ?')
let hideBtn = ref(true)
let likeMessage = ref('')
const eventOwner = ref('only my')

const showMoreDetails = (id) => {
  const getEventData = eventStore.allEvents.find(x => x.id == id)
  // const { date, description, image, organizer, rating, title } = currentEventData
  currentEventData.value = getEventData
};

const editEvent = () => {
  // console.log('edit...........');
  dialog.value = false
}

const joinTheEvent = (id) => {
  let currentEvent = eventStore.allEvents.filter(x => x.id == id)[0]
  let isVote = currentEvent.voters.find(x => x ==  eventOwnerUid.value)

  if (!isVote) {
    currentEvent.voters.push(eventOwnerUid.value)
    currentEvent.people++
    updateData(id, currentEvent)
     likeMessage.value = 'Thank you for like!'
     console.log('Thank you for like!') 
  } else {
    likeMessage.value = 'You have already voted!'
    console.log('You have already voted!');
  }
   
  
  setTimeout(() => {
    dialog.value = false
    likeMessage.value = ''
  } , 2500)
}

const onDeleteEventDialog = () => {  
    confirmDialog.value = true
}

const deleteEvent = id => {
  hideBtn.value = false
  deleteData(id)
    .then(() => {   
      eventStore.updateEvents()
      deleteEventMessage.value = 'Event was be deleted success.'
      console.log('Event was be deleted success.',)
  
    })
    .catch(e => {
      deleteEventMessage.value = 'Fail to delete event', e.message
      console.log('Fail to delete event', e.message)
    })

  setTimeout(() => {
        deleteEventMessage.value = 'Are you sure to want to delete this event ?'
        hideBtn.value = true
        dialog.value = false
        confirmDialog.value = false
      }, 2500);
    }

const onChangeEvents = () => {
  
  if (eventOwner.value == 'only my') { 
    eventOwner.value = 'all'
    eventStore.allEvents = eventStore.allEvents.filter(x => x.organizer == userDataStore.data.uid)  
       
  } else {
  eventStore.updateEvents()
  eventOwner.value = 'only my'
   
}
   
 
}

</script>

 <style scoped>
.title {
  border: 3px dotted blue;
  inline-size: 20em;
  border-radius: 6px;
  animation-name: changeColorTitle;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes changeColorTitle {
  from {
    border-color: red;
  }
  to {
    border-color: rgb(0, 110, 255);
  }
}
</style>