import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { firebaseSDK } from '@/service/sdk'
import { getAuth } from "firebase/auth";


let app
getAuth().onAuthStateChanged(async user => {
  if (!app) {   
    createApp(App).use(router, firebaseSDK,).mount('#app')
    if (user) {
      // await user.uid   //user login
    } else {
      // await user  //not user login
    }
  
  }
});

