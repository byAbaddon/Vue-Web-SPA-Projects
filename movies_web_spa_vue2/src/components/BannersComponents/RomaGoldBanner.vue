<template>
  <v-card class="mx-auto " max-width="210" height="500" style="background: maroon">
    <v-img
      class="align-end white--text"
      height="200"
      src="../../assets/images/pictures/gold.jpeg"
      cover
    >
      <v-card-title  class="neonText" > ROMA GOLD </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4 font-weight-bold grey--text">
      Welcome to the Gold Shop!
    </v-card-subtitle>

    <v-card-text>
      <div class="teal--text">
        A family business of sale Gold. With over 35 years of experience within
        the luxury watch trade.
      </div>
    </v-card-text>

    <v-card-actions class="ml-12 mt-5">
        <v-btn  color="orange" elevation="12" @click="shared">
           <v-icon size="24" color="yellow" class="">mdi-ring</v-icon>
               Share
            </v-btn>
        </v-card-actions>
    
     
      <v-card-text class="ml-12" v-show="showShared">
        <span class="blue--text  ml-6">  Shared...  </span>   
      </v-card-text>
         
  </v-card>
</template>

<script>
export default {
 data:() => ({
   showShared:false,
 }),
 methods:{
   shared(){
     this.showShared = true
     setTimeout(() => {
       this.showShared =false
     }, 1000);
   }
 }

};
</script>

<style scoped>

.neonText {
  animation: flicker 1.5s infinite alternate;
  color: #fff;
}



/* Flickering animation */
@keyframes flicker {
    
  0%, 18%, 22%, 25%, 53%, 57%, 100% {

      text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #0fa,
      0 0 80px #0fa,
      0 0 90px #0fa,
      0 0 100px #0fa,
      0 0 150px #0fa;
  
  }
  
  20%, 24%, 55% {        
      text-shadow: none;
  }    
}
</style>