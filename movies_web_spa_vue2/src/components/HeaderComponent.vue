<template>
  <div>
    <v-app-bar color="deep-purple darken-2" dark dense>

 <!-- mobile icon routing ---->
  <div
    v-show="$vuetify.breakpoint.xs"
    class="text-center">
    <v-menu rounded dark offset-y auto  min-width="2000">
      <template v-slot:activator="{on}" >
          <v-app-bar-nav-icon v-on="on" color="" dark />
      </template>

      <v-list>
        <v-list-item
         v-for="pages in isUserLogin
       ? this.pagesAfterAuth 
       : this.pagesBeforeAuth" :key="pages"  :to="pages =='home' ? '/' : pages"  class="blue--text"
       >       
          <v-list-item-title>{{ pages.toUpperCase() }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>


 <!-- avatar---->
         <v-avatar size="40" class="mr-2">
             <v-img :src="!userPhoto ? require('../assets/images/avatars/default.png') : userPhoto">
            </v-img> 
          </v-avatar>
 <!-- welcome label ---->

 <v-toolbar-title class=" " >Hi, {{ userName }}</v-toolbar-title>


 <!-- desktop version routing ---->
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <div
        v-show="!$vuetify.breakpoint.xs"
       v-for="pages in isUserLogin
       ? this.pagesAfterAuth 
       : this.pagesBeforeAuth" :key="pages" class="">
        <v-btn @click="onPageBtn" text rounded class="font-weight-bold">
          {{ pages }}
        </v-btn>
      </div>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      

 <!-- icons ---->
      <v-btn icon class="ml-7" >
        <v-icon :class="isUserLogin ? 'red--text' : null"  >mdi-heart</v-icon>
      </v-btn>

       <v-tooltip bottom color="warning">
          <template v-slot:activator="{on}">
            <v-btn icon  v-on="on" class="hidden-xs-only">
               <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Press F3</span>
      </v-tooltip>



    </v-app-bar>
  </div>
</template>

 
<script>

export default {

  data: () => ({
    isUserLogin: false,
    userName: localStorage.getItem("auth") == null ? "Anonymous" :  JSON.parse(localStorage.getItem('auth')).displayName,
    userPhoto: localStorage.getItem("auth") == null ? "" :  JSON.parse(localStorage.getItem('auth')).photoURL,
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
  
  created(){
     this.isUserLogin =  localStorage.getItem("auth") != null
  },

  mounted() {
    this.$root.$on("user-data", (userName, userPhoto) => {
      console.log(`Custom event!\nUser, ${userName} login success!`);
      console.log(`Custom event!\nUser photo, ${userPhoto} !`);
      this.isUserLogin = true;
      this.userPhoto = userPhoto
      this.userName = userName.split("")[0].toUpperCase() + userName.slice(1);
    })

  },
  // updated(){
  //       this.$root.$on('logout', () => {
  //          this.isUserLogin = false
  //          this.userPhoto = ''
  //          this.userName = "Anonymous"
         
  //       })
  //},

  beforeDestroy() {
    // removing listener
    this.$root.$off("user-data")
    this.$root.$off("logout")
  },


  beforeMount() {
    window.addEventListener("beforeunload", event => {
      if (localStorage.getItem("auth") != null) { //user login in this moment
          //  localStorage.clear()
           event.returnValue
           event.preventDefault()
          //  event.stopImmediatePropagation()
           return
      }
       return
    })
  }

};
</script>



