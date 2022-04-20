import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { firebaseSDK } from '@/service/sdk'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  firebaseSDK,
  render: h => h(App)
}).$mount('#app')
