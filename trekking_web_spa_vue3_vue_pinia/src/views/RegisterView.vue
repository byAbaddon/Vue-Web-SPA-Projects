

<script setup>
import register from "@/service/register";
import updateUserProfile from "@/service/updateUserProfile"
import { onMounted, ref} from "vue";
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mobile, name } = useDisplay()
const router = useRouter()
let showBtn = ref(true)
let typeMessage = ref('')
let messageAlert = ref('')

onMounted(() => {
  setTimeout(() => {
    const form = document.getElementById('registerForm')
    form != null ? form.reset() : null
  }, 500);
})

const onBtnRegister = e => {
  const username = e.target[1].value
  let photoURL = e.target[2].value || '../assets/images/user.png'
  const email = e.target[3].value
  const password = e.target[4].value
  const rePassword = e.target[5].value
  console.log(username, photoURL, email, password, rePassword);
   if (!/.+@.+\..+/.test(photoURL)) {
     photoURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCvPW4n2sq5EZhgjLF3U0iEZAMfkAE-J0nOA&usqp=CAUo"
   }
           console.log('done' , photoURL);
  if (password != rePassword) { 
    showBtn.value = false
    typeMessage.value = 'error' 
    messageAlert.value = 'Error - Password not match!'

    setTimeout(() => {
      showBtn.value = true
      e.target[3].value = e.target[4].value = ''
    }, 2000);
  
   
  } else {
      register(email, password).then((message) => {
        if (message == "success") {
           //new user success register
        
           updateUserProfile(username, photoURL); //update profile /add name and photo

          showBtn.value = false
          typeMessage.value = 'success'
          messageAlert.value = 'You register success and will be redirect...'
           setTimeout(() => {
             document.getElementById('registerForm').reset()
             router.push("/login") //redirect to page
           }, 2000);   
 
          } else {
             showBtn.value = false
             typeMessage.value = 'error'
             messageAlert.value = message
             setTimeout(() => (showBtn.value = true), 3000);
          }
        })
      }

      return{ messageAlert, typeMessage, showBtn}
}

</script>


<template>
  <div style="width: 80%; min-width: 20em;   margin:0 auto; margin-top:1em; margin-bottom: 2em;"
      :class="name == 'xs' ? 'w-100' : 'w-80'"
  >
      <form id="registerForm" @submit.prevent="onBtnRegister">
         <v-btn class="float-end"  variant="text" @click="router.push('/')">
           <v-icon color="red" size="30"  >mdi-window-close</v-icon>
        </v-btn>
    <div class="text-center mb-4">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <p>Join our family and make a wish!</p>
    </div>

    <div class="form-label-group">
      <input type="text" id="inputUsername" name="inputUsername" class="form-control" placeholder="Username" required
        autofocus maxlength="20">
      <label for="inputUsername"></label>
    </div>

    <div class="form-label-group">
      <input type="text" id="inputPhotoURL" name="photoURL" class="form-control" placeholder="PhotoURL  https://  Not required"
        autofocus
        >
      <label for="inputPhotoURL"></label>
    </div>

     <div class="form-label-group">
      <input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email"
        autofocus required>
      <label for="inputEmail"></label>
    </div>

    <div class="form-label-group">
      <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password"
       required  minlength="6">
      <label for="inputPassword"></label>
    </div>

    <div class="form-label-group">
      <input type="password" id="inputRePassword" name="rePassword" class="form-control" placeholder="Re-Password"
        required  minlength="6">
      <label for="inputRePassword"></label>
    </div>
    <div>
      <button v-if="showBtn" class="btn btn-lg btn-dark btn-block " type="submit">
          <p>Sign Up</p>
      </button>
       <v-alert v-else :type="typeMessage">{{messageAlert}}</v-alert>
       <!-- <v-alert v-show="!showBtn" type="success">Success Register! You will be redirect...</v-alert> -->
    </div>
 

    <div class="text-center mb-4">
      <p class="alreadyUser"> Already have account? Then just
        <router-link to="/login">
           <a href="#">Sign-In</a>!
        </router-link>
      </p>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">© The Trekking Zone - 2022.</p>
  </form>


  </div>
</template>


<style>

</style>