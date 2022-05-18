
<template>
  <div id="header">
    <h1>MyBlog</h1>
    <h2 v-show="isAuth">
      Welcome,&nbsp; <span>{{ userName }}!</span>
    </h2>
    <nav id="nav">
      <ul>
        <li v-if="!isAuth">
          <router-link to="/">Home</router-link>
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </li>

        <li v-else>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="" @click="logout">Logout</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import emitter  from 'tiny-emitter/instance'

export default {

  data: () => ({
    isAuth: false, //user login?
    userName: "",
  }),

  methods: {
    logout() {
      console.log("Logout success. Storage was clear!")
      localStorage.clear()
      this.$router.go()
    },
  },
  mounted(){
     emitter.once('login', () => {  //get custom event if user login
     this.isAuth = true
     this.userName = JSON.parse(localStorage.getItem("auth")).userName
     console.log('Custom event!', this.userName, 'login success');
   })
  },

  created() { 
    if (localStorage.getItem("auth") != null) {
      this.isAuth = true
      this.userName = JSON.parse(localStorage.getItem("auth")).userName
    }
  },

};
</script>


<style scoped>
#header {
  background: #212121da;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  /* width: 100%;
  position: absolute;
  left: 0;
  top: 0;
 */
}

#header h1 {
margin-left:12px;
background-image: linear-gradient( -225deg, #4b6ed8 0%, #a176e1 29%, #ff1361 67%, #fff800 100% );background-size: auto auto;
background-clip: border-box;
background-size: 200% auto;
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
-webkit-animation: textclip-5c833af0 15s linear infinite;
animation: textclip-5c833af0 15s linear infinite;
display: inline-block;
}

@keyframes textclip {
  to {
    background-position: 200% center;
  }
}



#nav {
  display: flex;
}

#nav ul {
  display: flex;
  list-style: none;
}

#nav li {
  margin: 0 15px;
}

#nav a {
  color: #fff;
  text-decoration: none;
  padding: 5px;
  margin: 10px;
  text-align: center;
  transition: 0.5s;
}

#nav a:hover {
  background: #fff;
  color: #212121;
  padding: 2px;
}

#header h2 {
  color: #fff;
  font-weight: 550;
  margin-left: 3.5em;
}

#header h2 span {
  color: rgb(255, 102, 0);
  position: absolute;
}
</style>
