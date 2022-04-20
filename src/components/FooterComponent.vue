<template>
  <div class="d-flex flex-column">
    <div class="deep-purple darken-2 white--text d-flex align-center px-4">
      <strong class="hidden-xs font-italic"
        >Get connected with us!</strong
      >
      <!-- button UP--->
      <v-spacer></v-spacer>
      <v-btn @click="scrollPageTop" icon class="white--text"><v-icon>mdi-arrow-up-circle</v-icon></v-btn>
      <v-spacer></v-spacer>

    <!-- other buttons--->
      <v-btn v-for="icon in icons" :key="icon" icon>
        <v-icon size="23" color="white"> {{ icon }} </v-icon>
      </v-btn>
    </div>

    <!--  second footerBar--->
    <div class="px-4 py-3 deep-purple darken-4 white--text text-center">
      2022 — <strong>Vuetify v2.6.4</strong>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),methods:{
scrollPageTop(){
  scroll(0, 0)
}
  }
};
</script>

