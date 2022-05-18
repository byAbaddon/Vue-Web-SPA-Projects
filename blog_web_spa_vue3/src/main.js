import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { firebaseSDK} from '@/services/sdk'
import { getAuth } from "firebase/auth"


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
