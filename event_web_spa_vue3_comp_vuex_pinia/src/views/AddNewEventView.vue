 <template>
  <v-row class="create">
    <v-col cols="12">
      <v-container class="d-flex justify-center">
        <v-row class="my-auto">
          <!-- Title--->
           <v-col cols="12" class="mt-n6 text-blue text-center text-decoration-underline">
            <h1>ORGANIZE EVENT</h1> 
           </v-col>
          <!--form  -->
          <v-col cols="12" sm="5" class="mx-auto">
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



             <!-- textarea -->
              <v-textarea
                color="blue"
                no-resize
                rows="4"
                row-height="15"
                outlined
                required
                append-icon="mdi-book-open-variant"
                v-model="description"
                :rules="descriptionRules"
                :counter="4"
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
                max="100"
                :value="people"
                disabled
              >
              </v-slider>
           </div>
              <v-btn
                :disabled="title.length < 2 || description.length < 4 || !date.length ||
                       !/https?:\/\//.test(image) || !descriptionRules || !textAreaCount || showAlert"
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
import { addData} from "@/service/addData";
import { useRouter } from 'vue-router'
import { useDataStore } from "@/stores/userData";
import { useEventStore } from "@/stores/events";
import { ref} from "vue";


export default {
  setup() {
    let dataStore = useDataStore()
    let eventStore = useEventStore()
    let router = useRouter()
    let valid = ref(true);
    let showAlert = ref(false);
    let message = ref("");
    let alertType = ref('error')
    
    let title = ref("E.T.")
    let titleRules =ref( [
      (v) => !!v || "Title is required",
      (v) => (v && v.length >= 2) || "Title must be that more 1 characters",
    ])

    let image = ref(
      "https://discover.ticketmaster.co.uk/wp-content/uploads/2022/05/Anything-Goes-2022.-Anything-Goes.-Photo-by-Marc-Brenner-738x415.jpg")
    let imageRules = ref([
      (v) => !!v || "Images is required",
      (v) =>
        (v && /https?:\/\//.test(v)) ||
        "Images must be start with http:// ot https://",
    ])
    let organizer = ref(dataStore.localData.uid)
   

    let description = ref("The third installment of  which follows the continuing adventures of Newt Scamander.")

    let descriptionRules = ref( [
      (v) => !!v || "Description is required",
      (v) => v && v.length > 3 || "Description must be more 4 characters",
      (v) => v.length < 200 || "Description must be less 200 characters",
    ])

    let date = ref(1)
    let dateRules = ref([
      (v) => !!v || "Date is required",
      (v) => (v && v.length >= 3) || "Date count must be number bigger than -1",
    ])
    let people = ref("0")
    let peopleRules = ref([
      (v) => !!v || "People description is required",
      (v) => (v && v >= 0) || "People is required",
    ])


 

    let validate = () => {     
      //scroll automatic to bottom page to show result message
      //  scroll(0, 9999)
      
      const newEventObj = {
        title: title.value.toUpperCase(), image: image.value, organizer: organizer.value,
        date: date.value, description: description.value, people: people.value, voters: []
      };
            
        //check is movie in collection
        const checkIsEventExist = eventStore.allEvents.some(x => x.title == title.value && x.image == image.value);
    
       //show message alert 
      
      if (!checkIsEventExist) {
            addData(newEventObj)
              .then((e) => {
                console.log("Success add new event to collection", e)
                 showAlert.value = true;
                alertType.value = 'success'
                message.value = 'Success add new event to collection'
                setTimeout(() => {
                  message.value = 'You will be redirect to event page...'
                }, 1500);
            
            })
            .catch((e) => {
              message.value = e
              showAlert.value = true;
          });

      } else {
         showAlert.value = true;
          message.value = "This event, already exist!"
        
      }   

      setTimeout(() => {
        message.value = showAlert.value = ''
         router.push("/events"); //redirect ot movies Page   
      }, 3000);

      }
  
   const exit = () => router.push("/events")  
     
   
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