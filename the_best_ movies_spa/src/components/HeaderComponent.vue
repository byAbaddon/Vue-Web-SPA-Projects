<template>

 <div>
   <v-app-bar fixed height="60" color="deep-purple darken-2" image="/assets/images/header.png">
    
    <!-- title label ---->
    <h3 class="text-effect text-shadow font-weight-bold  d-none d-md-block ml-4">BEST MOVIES BASE</h3>
    <!-- desktop version routing ---->
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>

    <v-btn v-show="showTitle" class=" text-effect-out   text-shadow   font-weight-bold text-center">BEST MOVIES BASE</v-btn>
    <!-- router page links ---->
    <div v-if="!isEffect" class="d-flex justify-evenly align-center">
      <v-btn @click="onPath" class="text-shadow font-weight-bold">Home</v-btn>
      <v-btn @click="onPath" class="text-shadow font-weight-bold">{{ btnName }}</v-btn>
      <v-btn @click="onPath" class="text-shadow font-weight-bold  mr-n4">About</v-btn>
      <v-btn v-if="store.isAdminLogin" @click="logout" class="font-weight-bold  ml-2">Logout</v-btn>  
    </div>
 
    <!-- icons ---->
    <v-btn v-if="!store.isAdminLogin" icon class="ml-12" @click="changeFont">
      <v-img  :src="btnImage" width="35px" class="img"></v-img>
    </v-btn>
    
  </v-app-bar>
</div>

</template>


<script setup>
import router from "@/router"
import { useMoviesStore } from '../stores/moviesStore'
import { ref, watch, onMounted } from 'vue'


const store = useMoviesStore()
const btnName = ref('Movies')
const showTitle = ref(false)
const mediaQuery = window.matchMedia('(max-width: 660px)')
let btnImage = ref('/assets/images/red.png')
let isEffect = ref(false)
let isFontChanged = false




const changeFont = () => {
  if (!isFontChanged) {
    document.body.style.fontFamily = 'Roboto'
    document.body.style.fontOpticalSizing = ''
    document.body.style.fontStyle = ''
    document.body.style.fontSize = ''
    btnImage.value = '/assets/images/red.png'
    isFontChanged = true
  } else {
  document.body.style.fontFamily = '"Playwrite CU", cursive'
    document.body.style.fontOpticalSizing = 'auto'
    document.body.style.fontStyle = 'normal'
    document.body.style.fontSize = 'smaller'
    btnImage.value = '/assets/images/blue.png'
    isFontChanged = false
  }
};

const updateTitleVisibility = () => {
  if (mediaQuery.matches) {
    showTitle.value = true;
    setTimeout(() => showTitle.value = false, 2200)
  }
}

const hideToolbarButtons = () => {
  if (mediaQuery.matches) {

    isEffect.value = true
    setTimeout(() => isEffect.value = false, 2200)
  }
}

const onPath = e => {
  hideToolbarButtons()
  let path = e.target.innerText.toLowerCase()
    // console.log(path);
    btnName.value = path == 'movies' ? 'Factory' : 'Movies'
    if (localStorage.getItem("auth") == null && path == 'factory') {
      console.log('Admin no signed in / redirect to login.')
      path='login'
  } 

    router.push(path == 'home' ? '/' : path)
    updateTitleVisibility();
}


const logout = () => {
  console.log('Logout success! All data was deleted, and redirect to HomePage')
  localStorage.removeItem("auth")
  store.isAdminLogin = false
  router.push("/").catch(() => { })
 }

watch(() => mediaQuery.matches, updateTitleVisibility, { immediate: true })
 
</script>


<style scoped>
.text-effect {
  display: inline-block;
  animation: slide-in 1s  ease-in-out forwards;
  font-size: 29px;
  color: #fff;

}



@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}


.text-effect-out {
  display: inline-block;
  animation: slide-in-out 3s ease-in-out forwards;
  font-size: 29px;
  color: #fff;
}


@keyframes slide-in-out {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  25% {
    transform: translateX(0);
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  75% {
    transform: translateX(-120%);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
    opacity: 0;
  }
}



.text-shadow {
  text-shadow:
    1px 1px 0px red,
    1px 1px 0px red,
    1px 1px 0px red,
    1px 1px 0px red,
    1px 1px 0px red;
}

.img {
  transform: scale(1);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);

  }

  50% {
    transform: scale(1);

  }

  100% {
    transform: scale(0.9);

  }
}



</style>
