<template>
  <div>
    <header-component />
    <div class="main">
      <router-view />
    </div>
    <footer-component />
  </div>
</template>

<script>   
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";



export default {
  data:()=>({
 
  }),

  components: {
    HeaderComponent,
    FooterComponent,
  },


  created() {
    if (localStorage.getItem('auth') == null ) {
        this.$router.push("/").catch(()=>{}) 
    }
  },

  beforeMount() {
    window.addEventListener("beforeunload", (event) => {
      if (localStorage.getItem("auth") != null) {
        event.returnValue;
        event.preventDefault() 
        return
      }
      return
    })
  },

};
</script>

<style lang="scss">

html {
  font-family: sans-serif;
 /*  Disable drag Introduced in IE 10.*/
  -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
    user-select: none;
}

html, body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
}


</style>
