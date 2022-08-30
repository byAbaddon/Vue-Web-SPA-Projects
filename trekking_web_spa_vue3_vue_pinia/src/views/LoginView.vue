<script setup>
import { ref ,onMounted } from "vue";
import { useRouter } from "vue-router";
import singUser  from "../service/login"; 
import getUserProfileData from "@/service/getUserProfileData";
import { useDataStore } from "../stores/userData";
import { useDisplay } from 'vuetify'

const { mobile, name } = useDisplay()
const userData = useDataStore()
const storeLoginFnc =  userData.login
const router = useRouter()
const checkLogin = ref(true)

onMounted(() => {
  setTimeout(() => {
    const form = document.getElementById('loginForm')
    form != null ? form.reset() : null
  }, 500);
})

const onBtnLogin = e => {
  const username = e.target[1].value
  const password = e.target[2].value


  singUser(username, password).then(message => {
    if (message == "success") {
      getUserProfileData().then(userData => {
        //getUserDataFromRegisterProfile
        const [userName, userPhoto] = userData
        console.log(userName, userPhoto)
        router.push('/')
        storeLoginFnc()
     })
    } else {
      checkLogin.value = false
      setTimeout(() => {
         document.getElementById('loginFrom').reset()
         checkLogin.value = true
      }, 2000);
    }
  })

   }
</script>


<template>
  <div style="width: 70%; min-width: 20em;   margin: 0 auto; margin-top:2em" 
   :class="name == 'xs' ? 'w-90' : 'w-80'"
   >
    <form id="loginFrom"   @submit.prevent="onBtnLogin">
      <v-btn class="float-end"  variant="text" @click="router.push('/')">
        <v-icon color="red" size="30"  >mdi-window-close</v-icon>
      </v-btn>
      <div class="text-center">
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      </div>
      <div class="form-label-group" >
        <input
          autofocus
          type="email"
          id="loginEmail"
          name="loginEmail"
          class="form-control"
          placeholder="Email"
          required
          value="koko@abv.bg"
        />
        <label for="loginEmail">Email</label>
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="loginPassword"
          name="loginPassword"
          class="form-control"
          placeholder="Password"
          minlength="6"
          required
          value="111111"
        />
        <label for="loginPassword">Password</label>
      </div>
      <div>
      <button v-if="checkLogin" class="btn btn-lg btn-dark btn-block" type="submit"
     
      >
        <p>Sign In</p>
      </button>
      <v-alert v-else type="error">'Error! Fail to login. Wrong email or password...'</v-alert>
      </div>   
      

      <div class="text-center mb-4">
        <p class="alreadyUser">
          Don't have account? Then just
           <router-link to="/register">
            <a href="#">Sign-Up</a>!
           </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        © The Trekking Zone - 2022.
      </p>
    </form>
  </div>
</template>


<style>
</style>