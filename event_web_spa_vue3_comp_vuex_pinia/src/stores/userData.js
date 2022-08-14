import { defineStore } from 'pinia'
import { ref } from "vue";

export const useDataStore = defineStore('userData', {
  state: () => ({
    isAuth: ref(localStorage.getItem('auth')),
    data: ref('')
  }),

  getters: {
    checkIsAuth: state =>  state.isAuth == null,   //user Not logIn
    localData: state =>  state.data = JSON.parse(localStorage.getItem('auth'))        
  },

  actions: {
    login() {
      this.isAuth = true
      this.data = JSON.parse(localStorage.getItem('auth'))
    },

    logout() {
      this.isAuth = false
      // this.data = ''
      localStorage.clear()
    },

  }
  
})


