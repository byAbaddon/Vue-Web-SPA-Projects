<template>
  <div id="about-page">
    <div class="about-container">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <h2>In the description of each film, you will get acquainted with:</h2>
      <ul>
          <li v-for="detail in details" :key="detail.title">
              <strong>{{ detail.title }}:</strong> {{ detail.description }}
          </li>
      </ul>
      <h2>Our Mission</h2>
      
      <p>{{ contact }}</p>

   <div>
      <div class="before-footer">
        <h2>Get connected with us on social networks!</h2>
     </div> 
    <div class="footer">
     <a href="#" class="fa fa-facebook"></a>
     <a href="#" class="fa fa-twitter"></a>
     <a href="#" class="fa fa-google"></a>
     <a href="#" class="fa fa-linkedin"></a>
     <a href="#" class="fa fa-youtube"></a>
     <a href="#" class="fa fa-instagram"></a>
     <a href="#" class="fa fa-pinterest"></a>
     <a href="#" class="fa fa-snapchat-ghost"></a>
     <a href="#" class="fa fa-skype"></a>
     <a href="#" class="fa fa-android"></a>
     <a href="#" class="fa fa-dribbble"></a>
     <a href="#" class="fa fa-vimeo"></a>
     <a href="#" class="fa fa-tumblr"></a>
     <a href="#" class="fa fa-vine"></a>
     <a href="#" class="fa fa-foursquare"></a>
     <a href="#" class="fa fa-stumbleupon"></a>
     <a href="#" class="fa fa-flickr"></a>
     <a href="#" class="fa fa-yahoo"></a>
     <a href="#" class="fa fa-reddit"></a>
     <a href="#" class="fa fa-rss"></a>
    </div>
   </div>
  </div>
  
 

  </div>
</template>

<script setup>

import { ref, watch, onMounted } from 'vue';
import { useDisplay } from 'vuetify';


const { xs } = useDisplay();

onMounted(() => { adjustHeight()})



const adjustHeight = () => {
      const pageWrap = document.querySelector('#about-page');
      if (pageWrap) {
        if (xs.value) {
          pageWrap.style.height = 'auto'
        } else {
          pageWrap.style.height = '89vh';
        }
      }
    }


    watch(xs, () => { adjustHeight() })


const title = ref('Welcome to our curated collection of movies');
const description = ref('Here you will discover carefully selected films that have left a lasting mark in cinema history. Our goal is to gather titles that inspire and excite.');
const details = ref([
    { title: 'Release Year', description: 'The period during which the film was created.' },
    { title: 'Director', description: 'The person behind the camera who shaped the story.' },
    { title: 'Actors', description: 'The talents that brought the characters to life.' },
    { title: 'Synopsis', description: 'A brief overview of the film’s plot.' },
    { title: 'Genre', description: 'The type of film that defines its style and content.' },
    { title: 'Country', description: 'The country where the film was produced, which may influence its style and cultural features.' },
    { title: 'Trailer', description: 'A visual glimpse into the atmosphere of the film.' },
    { title: 'Link to TMDb', description: 'A link to the film’s page on The Movie Database (TMDb) for additional information and ratings.' },
]);
const contact = ref('If you have suggestions for new titles or want to share your opinion about any of the films in our collection, feel free to contact us.');

</script>




<style scoped>

#about-page{
    font-family: Arial, sans-serif;
    background-image: url('/assets/images/bg/bg_about.png');
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    background-attachment: fixed; 
    height: 89vh;
    margin:0;
    padding: 0;

    font-family: "Playwrite CU", cursive;
    font-optical-sizing: auto;
    font-weight: 100;
    font-style: normal;
}

h2 {
  color:azure;  
 }
  

.about-container {
	background: rgba(2,2,2,0.6);
	border-radius: 8px;
	/* box-shadow: 0 2px 5px rgba(81, 14, 14, 0.1); */
	padding: 20px;
	color: deepskyblue;

}

.about-container{
  position: relative;
  top: 3em;
}
.about-container h1 {
  font-size: 24px;
  margin-bottom: 10px;
 
}

.about-container p {
  line-height: 1.6;
  margin-bottom: 15px;
  color: deepskyblue;
}

.about-container ul {
  list-style-type: disc;
  margin-left: 20px;
}

.about-container a {
  color: #007bff;
  text-decoration: none;
}

.about-container a:hover {
  text-decoration: underline;
}




/* -------------------------- social connections */


.footer {
  display: flex;
  justify-content: space-between;
  padding-bottom: 4em;
  flex-wrap: wrap;
 
}


.before-footer h2{
  color: azure;
  padding: 1.4em;
  text-align: center;

}

.before-footer > h2:nth-child(1){
  text-align: ceinter; 
}

.fa {
  padding: 10px;
  font-size: 20px;
  width: 40px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
  border-radius: 50%;
}

.fa:hover {
    opacity: 0.7; 
}
.about-container a:hover{
   text-decoration: none;
}

.about-container a {
  color:white;
}



.fa-facebook {
  background: #3B5998;
  color: white;
}

.fa-twitter {
  background: #55ACEE;
  color: white;
}

.fa-google {
  background: #dd4b39;
  color: white;
}

.fa-linkedin {
  background: #007bb5;
  color: white;
}

.fa-youtube {
  background: #bb0000;
  color: white;
}

.fa-instagram {
  background: #125688;
  color: white;
}

.fa-pinterest {
  background: #cb2027;
  color: white;
}

.fa-snapchat-ghost {
  background: #fffc00;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.fa-skype {
  background: #00aff0;
  color: white;
}

.fa-android {
  background: #a4c639;
  color: white;
}

.fa-dribbble {
  background: #ea4c89;
  color: white;
}

.fa-vimeo {
  background: #45bbff;
  color: white;
}

.fa-tumblr {
  background: #2c4762;
  color: white;
}

.fa-vine {
  background: #00b489;
  color: white;
}

.fa-foursquare {
  background: #45bbff;
  color: white;
}

.fa-stumbleupon {
  background: #eb4924;
  color: white;
}

.fa-flickr {
  background: #f40083;
  color: white;
}

.fa-yahoo {
  background: #430297;
  color: white;
}

.fa-soundcloud {
  background: #ff5500;
  color: white;
}

.fa-reddit {
  background: #ff5700;
  color: white;
}

.fa-rss {
  background: #ff6600;
  color: white;
}




</style>



