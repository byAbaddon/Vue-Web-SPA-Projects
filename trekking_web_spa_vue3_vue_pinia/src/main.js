import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { createPinia } from 'pinia'            //manuel added
import { firebaseSDK } from '@/service/sdk'   //manuel added

loadFonts()

createApp(App)
  .use(createPinia())  //manuel added
  .use(router)
  .use(vuetify)
  .mount('#app')

