<template>
  <div>
    <v-app-bar color="deep-purple darken-2" dark dense>
      <v-app-bar-nav-icon ></v-app-bar-nav-icon>

      <v-toolbar-title class="mr-12" >Welcome, {{ userName }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <div v-for="pages in isUserAuth ? this.pagesAfterAuth : this.pagesBeforeAuth" :key="pages" class="">
        <v-btn @click="onPageBtn" text rounded class="font-weight-bold">
          {{ pages }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon :class="isUserAuth ? 'red--text' : null"  >mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

 
<script>
export default {
  data: () => ({
    isUserAuth: false,
    userName: "Anonymous",
    pagesBeforeAuth: ["home", "login", "registration"],
    pagesAfterAuth: ["home", "movies", "factory", "about", 'logout'],
  }),

  methods: {
    onPageBtn(e) {
      //router navigation to page
      let currentPage = this.$route.name;
      let toNextPage = e.currentTarget.textContent.trim();

      if (currentPage != toNextPage) {
        toNextPage == (undefined || null || "home") ? (toNextPage = "/") : null  
        this.$router.push(toNextPage);
      }
    },
  },


  mounted() {
    this.$root.$on("login-user", (userName) => {
      console.log(`Custom event!\nUser, ${userName} login success!`);
      this.isUserAuth = true
      this.userName = userName.split('')[0].toUpperCase() + userName.slice(1,)
    }),
    this.$root.$on('logout', ()=>  this.isUserAuth = false)

  },
    beforeDestroy() {
    // removing listener
    this.$root.$off('login-user')
    this.$root.$off('logout')
  }
};
</script>



