<script setup>
import { useDataStore  } from "../src/stores/userData";
import { useRouter} from 'vue-router'  
import HeaderComponent from '../src/components/HeaderComponent.vue'
import FooterComponent from '../src/components/FooterComponent.vue'
import { defineComponent, onBeforeMount, onMounted  } from 'vue';

defineComponent(() => { HeaderComponent, FooterComponent })
const router = useRouter()
const userData = useDataStore()

onMounted(() => {
  if (localStorage.getItem('auth') == null) {
    router.push("/").catch(() => { })
  }
})

onBeforeMount(() => {
  window.addEventListener("beforeunload", (event) => {
    if (localStorage.getItem("auth") != null) {
      event.preventDefault();
      return;
    }
    return;
  });
});

</script>


<template>
  <v-app >
    <header-component />
    <v-main id="main">
      <router-view />
    </v-main>
    <footer-component />
  </v-app>
</template>



<style>
*{
  font-family: cursive;
}
html {
  font-family: cursive;
 /*  Disable drag Introduced in IE 10.*/
  -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
    user-select: none;
}

#main{
  background-image: url("../src/assets/images/annapurna.jpg");
  background-size:cover;
}
.container {
  max-width: 960px;
}

a{
  text-decoration: none;
}

.a-button{
  color: rgb(46, 45, 45);
  padding:10px;
  transition: ease-in-out color .15s;
}
.a-button:hover{
  color: rgb(78, 58, 2);
  text-decoration: none;
}
/*
 * Custom translucent site header
 */

.site-header{
  background-color: rgba(75, 73, 73, 0.904);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}
.site-header a {
  color: rgb(218, 218, 218);
  transition: ease-in-out color .15s;
}
.site-header  a :hover {
  color: #fff;
  text-decoration: none;
}

.header-hover:hover {
   color: #5b9bc5;
   text-decoration: none;
   cursor:pointer;
   
}

.flex-equal > * {
  -ms-flex: 1;
  flex: 1;
}
@media (min-width: 768px) {
  .flex-md-equal > * {
    -ms-flex: 1;
    flex: 1;
  }
}

.overflow-hidden { overflow: hidden; }

footer p{
   position:relative;
   float:left;
}


.trek-details{
    display: block;
    color: rgb(0, 0, 0);      
    width: 25%;
    margin: 1.5rem auto 48px auto;      
    text-align: center;      
    border-radius: 15px;    
    font-size: 18px;
    /* padding: 0.5rem 0;   */
    font-weight: bold;
}
.card-image{
  max-height: 50%;
  max-width: 24.5%;
}
.card-text{
  top:10px;
}

a.trek-details:hover{
  text-decoration: none;
  background: #333;
  color: white;
  border: 2px solid #333;
}

.trek-hover:hover{
  text-decoration: none;
  background: #333;
  color: white;
  border: 2px solid #333;
  cursor:pointer;
 
}

form, .profile,.home{
    background-color:rgba(255, 255, 255, 0.479);
    padding:2%;
    width: 80%;
    margin: 0 auto;
    margin-top:2%;
    border:solid;
    border-radius:1rem;
    border-color:rgb(241, 179, 6);
    box-shadow:0 0 1.5rem 0 rgba(0, 0, 0, 0.712);
    text-align: center;
}

input.form-control{
    padding:5px;
    width: 50%;
    margin: 0 auto;
    background: white;
    border-radius: 3px;
}

textarea.form-control{
    width: 50%;
    margin: 0 auto;
    resize: none;
    height: 12vh;
}

input, textarea {
  min-width: 12em;
}
button {
  min-width: 8em;
}


.buttons-together{
  margin: auto;
  margin-top:2%;
}
form label{
  display:block;
  margin: 0 auto;
  width: 50%;
  text-align: center;
  margin-bottom: 2%;
}

.btn{
  width: 25%;
  padding:7px;
  margin: 0 auto;
  border-radius:6px;
  color: white;
  background-color: rgba(51, 51, 51, 0.842);
}
.btn > p:nth-child(1){
  color:white;
}

.alreadyUser{
   margin: 1%;
}


.no-found-template{
   margin: 0 auto;
   text-align: center;
}

#fouronefour{
   width: 50%;
   margin:1.5em auto;
   border:solid;
   border-color: rgba(27, 27, 27, 0.904);
   box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.76);
}

.container{
  margin: 0 auto;
}

.alert{
   width: 50%;
   margin: 0 auto;
   text-align: center;
   margin-top: 1%;
}

.imageContainer{
   border:2px solid black;
   border-radius: 25px;
}

.single-trek-details{
  background-color:rgba(255, 255, 255, 0.849);
   padding: 2%;
   margin:auto;
   max-width: 80%;
   border:solid;
   border-radius:1rem;
   border-color:rgb(241, 179, 6);
   box-shadow:0 0 1.5rem 0 rgba(0, 0, 0, 0.712);
}

.infoType{
   text-decoration: underline;
}

.trek-description{
   font-style: italic;
}
.text-highlighted{
  color: rgb(248, 184, 8);
}

/* ------------------------------------------------------------------------------------------------------------------------ */

#successBox, #loadingBox, #errorBox{
display: none;

margin-bottom: 2%;
}

nav{
margin-bottom: 2%;
}

.treksPlaceholder{
  background-color:rgba(255, 255, 255, 0.795);

border:solid;
border-color:rgb(241, 179, 6);
box-shadow:0 0 1.5rem 0 rgba(0, 0, 0, 0.712);
border-radius: 4%;
}

#treks-list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.img{
  display: block;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.411); 
   /* border */
  background: rgb(246, 217, 154);
  box-shadow: 0 0 10rem 0 rgba(0, 0, 0, 0.712);
}


.img:before {
display: block;
content: '';
padding-top: 100%;
}

.logo-image {
display: block;
width:100%;
height: auto;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

}

@media screen and (max-width:900px){
.treksPlaceholder{
  flex: 0 1 80%;
 
}
}

.profile-img{
  margin: 0 auto;
  width: 150px;
  height: auto;
  position: static;
  top: 0;
  left: 0;
  transform: none;
}

.profile-info{
  padding: 0;
}

.details-img{
  width: 40%;
  height: auto;
  margin: 0 auto;
  position: static;
  top: 0;
  left: 0;
  transform: none;
  border:1px solid black;
}

.no-found-picture, .home-picture{
  top:0;
  left:0;
  transform: none;
  width: 100%;
  position: static;
  margin: 0 auto;
}

.create-trek{
  background-color:rgba(255, 255, 255, 0.534);
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover; 
  border-radius:15px;
  padding:2rem;
  box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.712);
}

.home{
  background-color:rgba(255, 255, 255, 0.781);
  max-width:90%;
}
.footer{
  color: rgba(255, 255, 255, 0.513);
}
.no-found-template{
color: rgba(255, 255, 255, 0.513);
}


.rainbow-text {
  background-image: 
    linear-gradient(to right, red,orange,yellow,green,white); 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;  
}

.re-rainbow-text {
  background-image: 
    linear-gradient(to left, red,orange,yellow,green,white); 
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;  
}

</style>