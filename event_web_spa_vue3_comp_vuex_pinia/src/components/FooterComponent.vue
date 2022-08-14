<script  setup>
const icons = ["mdi-arrow-up-thick", "mdi-home", "mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];

const onIconBtn = (e) => {
  const iconName = e.target.attributes.class.textContent.split(' ')[0]
  iconName == 'mdi-arrow-up-thick' ? scroll(0,0) : ''
}

</script>



<template>
<v-footer 
   class="bg-blue-grey-darken-4 text-white text-center d-flex flex-column">
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :to="`${icon == 'mdi-home' ? '/' : ''}`"
        class="mx-4 text-white"
        :icon="icon"
        variant="text"
        @click="onIconBtn"
      ></v-btn>
    </div>

    <div class="text-white pt-0">
     WEB Single Page Application using Vue 3 Composition Vuex-Pinia
    </div>
   <v-divider></v-divider>

    <div class="text-white">
      <strong>Vuetify 3.0 Beta</strong>
    </div>
 
  </v-footer>
</template>