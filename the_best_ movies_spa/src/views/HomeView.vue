<template>
  <div>
    <div class="video-background">
      <video autoplay muted class="background-video">
        <source src="/assets/images/bg/cinemaWeb.mp4" type="video/mp4" />
      </video>

    <div class="content">   

      <v-container >
        <h1 class=" d-none d-md-block font-playwrite  text-white text-center my-16 text-uppercase ">Welcome to the BEST MOVIES BASE</h1>
        <h1 class=" d-md-none font-playwrite  text-white text-center my-2 text-h6 font-weight-bold ">Welcome to the <br> BEST MOVIES BASE</h1>
        
        <h3 v-for="(row, index) in arrayText" :key="index" class="d-none d-md-block  font-playwrite  text-white text-center my-6 text-uppercase">
          {{ row }}
        </h3>
       
           <p v-for="(row, index) in arrayText" :key="index" class="d-md-none  font-playwrite  text-white text-center my-6 text-body-2">
             {{ row }}
           </p>>
         

        

      </v-container>
    
      </div>
    </div>


 

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const arrayText = ref(['We bring together a community of movie lovers',
  'Here you will find the collection of the best movies of all time',
  'All movies are carefully selected and include all genres such as: dramas, thrillers, action, westerns, etc',
  'Our platform offers the latest information, reviews, and ratings for a vast range of movies',
  'Search for movies by title or genre, Filter results based on user ratings and release dates',
  'Thank you for choosing BEST MOVIES BASE',
  'Follow us on social media for the latest updates',
  'We hope you enjoy your journey through the world of cinema',
])

onMounted(() => {
  window.scrollTo({
    top:  window.innerHeight * 0.1,
    behavior: 'smooth'
  });
})


</script>


<style scoped>

/*<weight>: Use a value from 100 to 400 
*/
 
 .font-playwrite {
    font-family: "Playwrite CU", cursive;
    font-optical-sizing: auto;
    font-weight: 100;
    font-style: normal;
  }


.video-background {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  position: relative;
  z-index: 1;
}


.background {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)),
    url('/assets/images/home4.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}



</style>