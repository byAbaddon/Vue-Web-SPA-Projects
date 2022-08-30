import { defineStore } from 'pinia'
import { loadAllTreks } from "../service/loadAllTreks.js";


export const useTrekStore = defineStore('treks', {
  state: () => ({
    allTreks: []

  }),
  
  getters: {},
  
  actions: {
    updateTreks() {
      loadAllTreks().then(data => this.allTreks = data)
    } 
  },


})

