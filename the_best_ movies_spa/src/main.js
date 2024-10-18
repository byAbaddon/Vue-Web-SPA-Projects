import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { firebasePlugin } from '@/service/sdk'

// import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons
import 'font-awesome/css/font-awesome.css'; // Font Awesome Icons

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

loadFonts()

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)  
app.use(vuetify)
app.use(firebasePlugin)
app.mount('#app')
