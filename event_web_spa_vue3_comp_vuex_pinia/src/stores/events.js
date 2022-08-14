import { defineStore } from 'pinia'
import { loadAllEvents, events } from "@/service/loadAllEvents";


export const useEventStore = defineStore('events', {
  state: () => ({
    allEvents: []

  }),
  
  getters: {},
  
  actions: {
     updateEvents() {
      loadAllEvents().then(data => this.allEvents = data)
    } 
  },


})

