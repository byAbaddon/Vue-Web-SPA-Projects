
<template>
  <div class="bg">

    <v-row class="d-flex flex-wrap justify-center align-center" 
    style="margin:0; padding:0;  height: 86.4vh;">
      <v-col  style="z-index: 1; position: absolute; top: 17em; left: 0;">
        <!-- alert   -->
        <v-alert class="mx-auto" height="50" max-width="360" type="error" icon="mdi-alert" v-show="showErrorAlert">
          {{ errorMessage }}
        </v-alert>
      </v-col>


      <v-col cols="12" class="">
        <v-card class="mx-auto" min-width="22em" max-width="22em">
          <v-card-title class="d-flex justify-center bg-blue-lighten-3 text-red">
            <span class="white--text">LOGIN ADMIN PANEL</span>
          </v-card-title>

          <v-img src="../../assets/images/loginUser.jpeg"
            lazy-src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fjohannesippen.com%2Fimg%2Fblog%2Fhumans-not-users%2Fheader.jpg&sp=1649872596T2df0fb122f3a588a8bfb58d76fefa957808b5d9b8c2924cf82e7f451f90f9741"
            height="230px" cover eager></v-img>

          <v-form class="bg-blue-lighten-3">
            <!-- email   -->
            <v-text-field style="height:100px;" class="my-0 pa-5 py-10" prepend-inner-icon="mdi-email mr-3 mt-1"
              append-icon="mdi-blank" v-model="email" :rules="emailRules" label="E-mail" type="email" required
              clearable></v-text-field>

            <!-- password   -->
            <v-text-field style="height: 100px;" class="mx-5" prepend-inner-icon="mdi-lock mr-3" clearable
              label="Password" v-model="pass" :rules="passRules" :counter="6" required
              :append-icon="showPass ? 'mdi-eye ' : 'mdi-eye-off'" :type="showPass ? 'text' : 'password'"
              @click:append="toggleShowPass"></v-text-field>

            <!-- btnLogin   -->
            <div class="text-center mt-0 pb-5">
              <v-btn class="text bg-blue-lighten-1 white--text"
                :disabled="showProgressCircular ||  !isFormValid"
                :loading="showProgressCircular" elevation="8" @click="login">
                Login
              </v-btn>
            </div>
          </v-form>
        </v-card>


      </v-col>

    </v-row>


  </div>
</template>

<script setup>
import router from "@/router"
import { useMoviesStore } from '@/stores/moviesStore'
import { ref, computed } from 'vue'
// import useScreenObserver from '@/globalsObject/displayChangerWatcher.js'

const store = useMoviesStore()
// const isSmallScreen = useScreenObserver()


const email = ref('')
const pass = ref('')
const showPass = ref(false)
const showProgressCircular = ref(false)
const showErrorAlert = ref(false)
const errorMessage = ref('')


const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(v) || 'E-mail must be valid',
]

const passRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length > 5) || 'Password must be more than 5 characters',
]


const isFormValid = computed(() => {
  return emailRules.every(rule => rule(email.value) == true) &&
         passRules.every(rule => rule(pass.value) == true);
})



const toggleShowPass = () => {
  showPass.value = !showPass.value
}

const login = async () => {
  showProgressCircular.value = true
  setTimeout(() => (showProgressCircular.value = false), 2000)

  //only admin allowed login
  if (email.value != 'administrator@abv.bg') {
    errorMessage.value = "Wrong admin name or password!"
    showErrorAlert.value = true
    setTimeout(() => (showErrorAlert.value = false), 2000)
    return
  }

 
  const message = await store.loginUser(email.value, pass.value)
  if (localStorage.getItem("auth")) {
      console.log('Admin was login success redirect to factory')
      router.push("/factory").catch(() => { })
  }  else {
    errorMessage.value = "Wrong admin name or password!"
    showErrorAlert.value = true
    setTimeout(() => (showErrorAlert.value = false), 2000)
  }
}
</script>



<style scoped>

.bg {

  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
    url('/assets/images/home3.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
