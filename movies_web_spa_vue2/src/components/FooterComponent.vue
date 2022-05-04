<template>
  <div class="d-flex flex-column">
    <div class="deep-purple darken-2 white--text d-flex align-center px-4">
      <strong class="hidden-xs font-italic">Get connected with us!</strong>
      <!-- button UP--->
      <v-spacer></v-spacer>
      <v-btn @click="scrollPageTop" icon class="white--text"
        ><v-icon>mdi-arrow-up-circle</v-icon></v-btn
      >
      <v-spacer></v-spacer>

      <!-- other buttons--->
      <v-btn v-for="icon in icons" :key="icon" icon>
        <v-icon size="23" color="white"> {{ icon }} </v-icon>
      </v-btn>
    </div>

    <!--  second footerBar--->
    <div
    v-if="cookiesBar"
    class="px-4 py-3 deep-purple darken-4 white--text text-center">
      2022 — <strong>Vuetify v2.6.4</strong>
    </div>

    <div 
    v-else
    class="px-4 py-3 deep-purple darken-4 white--text text-center">
      We use cookies - they help us give you the best possible experience!
       <v-btn outlined small dark color="blue" @click="cookiesBar = true" class="ml-1">  Agree </v-btn>     
    </div>


      <!-- <div class="text-center">
        <v-snackbar v-model="snackbar" :timeout="3000" max-height="10"  :shaped="true"
        color="blue-grey darken-4"
        class="mb-n2 font-italic"
        >
          We use cookies - they help us give you the best possible experience!
      
            <v-btn outlined small color="green" @click="snackbar = false" class="ml-1">
              Agree
            </v-btn>
        </v-snackbar>
      </div> -->
  
  </div>
</template>

<script>
export default {
  data: () => ({
    cookiesBar: false,
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods: {
    scrollPageTop() {
      scroll(0, 0);
    },
  },
};
</script>
