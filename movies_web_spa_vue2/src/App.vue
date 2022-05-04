<template>
  <v-app>
    <header-component />
    <v-main class="main">
      <router-view />
    </v-main>
    <footer-component />
  </v-app>
</template>


<script>
// Components
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },

  name: "App",

  data: () => ({
  }),

 created() { 
    if (localStorage.getItem("auth") == null) {     
      this.$router.push("/").catch({});
    }
  },


};
</script>

<style>
.main {
  background: #e8eaf6;
}
</style>
