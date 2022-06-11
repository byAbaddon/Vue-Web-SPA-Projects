<template>
  <div class="not-found">
    <div class="image">
      <img src="@/assets/images/angryChef.png" width="860" alt="chef-pic" />
    </div>
    <h1 >Page Not Found 404!</h1>
     <p>Press button to home</p>
    <div class="navigate">
      
       <input @click="onGoToHomePage" type="button" value="Home page"  class="font-effect-fire-animation" /> 
    </div>
  </div>
</template>

<script>

import router from '@/router'
import { onBeforeMount } from 'vue';
import emitter from "tiny-emitter/instance";

export default {


setup(){

 onBeforeMount( () => {
    document.querySelector('nav').style.display = 'none'
      document.querySelector('.mastfoot').style.display = 'none'
 })

 const onGoToHomePage = () => {
    if(localStorage.getItem('auth')){
      emitter.emit('login')
    }
      
   document.querySelector('nav').style.display = 'flex'
   document.querySelector('.mastfoot').style.display = 'block'
   router.push('/category')
 }

   return {onGoToHomePage}
 }


};
</script>


<style scoped>
.not-found{
  display: flex;
  flex-direction: column;
}


p{
  color:rgb(255, 255, 255);
  text-align: center;
}
.image {
  margin: 0 auto;
  position: relative;
  left: 2em;

}

h1 {
  color: white;
  text-align: center;
  font-weight: bold;
}
.navigate {
  display: flex;
  justify-content: center;
}

.navigate span {
  color: white;
}

input {
padding: 6px;
color: crimson;
background: black;
border: 1px solid azure;
border-radius: 6px;
border-style: ridge;
font-weight: bold;
font-size: larger;

}

input:hover {
  color: rgb(252, 252, 252);
  cursor: pointer;
}


@import url(https://fonts.googleapis.com/css?family=Anton&effect=fire-animation);
html {
  background: #ddd;
}

h1 {
  font-family: 'Anton', sans-serif;
  /* font-size: 60px; */
}


</style>