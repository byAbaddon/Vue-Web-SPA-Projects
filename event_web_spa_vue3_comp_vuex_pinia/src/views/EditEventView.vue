 <template>
  <v-row class="create">
    <v-col cols="12">
      <v-container class="d-flex justify-center">
        <v-row class="my-auto">
          <!-- Title--->
           <v-col cols="12" class="mt-n6 text-orange text-center text-decoration-underline">
            <h1>EDIT EVENT</h1> 
           </v-col>
          <!--form  -->
          <v-col cols="12" sm="5"  class="mx-auto">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                color="blue"
                class="text-black"
                v-model="title"
                :rules="titleRules"
                label="Title"
                append-icon="mdi-alpha-t-circle-outline"
                required
                variant="outlined"
                 maxlength="30"
              ></v-text-field>

              <v-text-field
                color="blue"
                v-model="image"
                :rules="imageRules"
                label="URL-Image"
                placeholder="https://"
                append-icon="mdi-image"
                required
                variant="outlined"
              ></v-text-field>

              <v-text-field
                color="blue"
                v-model="organizer"
                label="Organizer"
                append-icon="mdi-ninja"
                required
                variant="outlined"
                disabled
               suffix="This was added automatic!"
              ></v-text-field>

              <v-text-field
                color="blue"
                v-model="date"
                :rules="dateRules"
                label="Date"
                required
                append-icon="mdi-calendar"
                type="date"
                min=""
                variant="outlined"
              ></v-text-field>

              <v-textarea
                color="blue"
                no-resize
                rows="3"
                 row-height="15"
                outlined
                required
                append-icon="mdi-book-open-variant"
                v-model="description"
                :rules="descriptionRules"
                :counter="4"
                name="i"
                label="Description"
                variant="outlined"
                :v-model="textAreaCount = description.length < 200" 
              ></v-textarea>
          <div>
              <div class="text-caption">People who like event/default zero</div>
              <v-slider
                color="blue"
                v-model="people"
                :rules="peopleRules"
                label="№"
                reverse-label
                required
                append-icon="mdi-medal"
                step="1"
                max="1000"
                :value="people"
              >
              </v-slider>
           </div>
              <v-btn
                :disabled=" title.length < 2 || description.length < 4 || !date.length || !/https?:\/\//.test(image) || !textAreaCount"
                color="success"
                :elevation="12"
                class="mr-4"
                @click="validate"
              >
                Add
              </v-btn>

              <!-- <v-btn :elevation="12" color="error" class="mr-4" @click="reset"> Reset </v-btn> -->
              <v-btn :elevation="12" color="error" class="mr-4" @click="exit">
                Exit
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col>
      <!-- alert   -->
      <div class="mx-auto">
        <v-alert
          v-show="showAlert"
          class="mx-auto"
          height="50"
          width="47em"
          :type="alertType == 'success'? 'success' : 'error'"
        >
          {{ message }}
        </v-alert>
      </div>
    </v-col>
  </v-row>
</template>



<script>
import { editData} from "@/service/editData";
import { useRouter, useRoute } from 'vue-router'
import { useEventStore } from "@/stores/events";
import { ref, onMounted } from "vue";


export default {
  setup() {
    scroll(0,0)
    let eventStore = useEventStore()
    let router = useRouter()
    let route = useRoute()
    let valid = ref(true);
    let showAlert = ref(false);
    let message = ref("");
    let alertType = ref('error')
    let currentEventData = ref('')

    onMounted(() => {
      currentEventData.value = eventStore.allEvents.find(x => x.id == route.params.id)
      title.value =  currentEventData.value.title
      image.value =  currentEventData.value.image
      organizer.value =  currentEventData.value.organizer
      description.value =  currentEventData.value.description
      people.value =  currentEventData.value.people
      date.value = currentEventData.value.date  
    })
    
    let title = ref('')
    let titleRules =ref( [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 2) || "Title must be that more 1 characters",
    ])

    let image = ref('')
    let imageRules = ref([
      (v) => !!v || "Images is required",
      (v) =>
        (v && /https?:\/\//.test(v)) ||
        "Images must be start with http:// ot https://",
    ])
    let organizer = ref('')
   

    let description = ref('')

    let descriptionRules =ref( [
      (v) => !!v || "Description is required",
      (v) =>(v && v.length > 3) || "Description must be more than 4 characters",
      (v) => v.length < 200 || "Description must be less 200 characters",
    ])

    let date = ref('')
    let dateRules = ref([
      (v) => !!v || "Date is required",
      (v) => (v && v.length >= 3) || "Date count must be number bigger than -1",
    ])
    let people = ref('')
    let peopleRules = ref([
      
    ])

    let validate = () => {     
      //scroll automatic to bottom page to show result message
      //  scroll(0, 9999)
      
      const newEventObj = {
        title: title.value.toUpperCase(), image: image.value, organizer: organizer.value,
        date: date.value, description: description.value, people: people.value,
      };
            
    
            editData(currentEventData.value.id ,newEventObj)
              .then((e) => {
                console.log("Success edit event", e)
                 showAlert.value = true;
                alertType.value = 'success'
                message.value = 'Event was edit success'
                setTimeout(() => {
                  message.value = 'You will be redirect to event page...'
                }, 1500);
            })
            .catch((e) => {
              message.value = e
              showAlert.value = true;
          });

    
      setTimeout(() => {
                message.value = showAlert.value = ''
                 router.go(-1);   //redirect ot movies Page   
             }, 3000);
      }
    

   const  exit = () => router.go(-1);  
     
   
    return {
      valid,
      showAlert,
      alertType,
      message,
      title,
      titleRules,
      image,
      imageRules,
      organizer,
      description,
      descriptionRules,
      date,
      dateRules,
      people,
      peopleRules,
      validate,
      exit,
    };
  },
};
</script>



<style scoped >
.create {
  margin: 0em;
  height: 100%;
  background: url("") no-repeat, linear-gradient(#ffffff, #ffffff);

  /* background: white; */
}
</style>