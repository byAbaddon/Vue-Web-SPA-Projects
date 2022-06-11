<template>
  <div id="app">
    <header-component />
    <main>
       <router-view />
    </main>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { onBeforeMount } from "vue";

// onBeforeMount, 
export default {
  name: "App",
  components: { HeaderComponent, FooterComponent },

  setup() {   
    onBeforeMount(() => (
      window.addEventListener("beforeunload", (event) => {
        if (localStorage.getItem("auth") != null) {
          event.returnValue
          event.preventDefault()
          return
        }
        return
      })
     )
    )

  }
}
</script>



<style >   
/*
Global Style
 */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

html {
   
  /* font-family: sans-serif; */
  /*  Disable drag Introduced in IE 10.*/
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
}
/* Links */

#notifications {
  position: fixed;
  top: 48px;
  right: 5px;
}

a,
a:focus,
a:hover {
  color: #fff;
}

/* Custom default button */

.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none;
  /* Prevent inheritance from `body` */
  background-color: #fff;
  border: 0.05rem solid #fff;
}

/*
 * Base structure
 */

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background:  url("@/assets/images/background.jpg");
 background-attachment: fixed;
  
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: white;

}

.cover-container {
  max-width: 42em;

}

/*
 * Cover
 */

.cover {
  padding: 0 1.5rem;
}

.cover .btn-lg {
  padding: 0.75rem 1.25rem;
  font-weight: 700;
}

/*
 * Main
 */


/* .color-gray {
  background: rgba(255, 255, 255, .7);
} */

.form-layout {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  margin-top: 50px;
  color: #050202;
}

.form-layout button {
  background: #7d0000;
  margin-top: 20px !important;
}

#share-receipt-form select {
  border-radius: 4px;
  background: white;
  width: 100%;
  padding: 9px;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
html, body {
   font-family: 'Roboto', sans-serif;
}

</style>