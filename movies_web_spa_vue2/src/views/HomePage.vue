<template>
<div>
    <v-row class="mt-12" >
      <v-col :cols="2" class="hidden-xs-only  hidden-sm-only"> <pizza-banner /> </v-col>  
      <v-col :cols="displaySize">
        <v-carousel id="carousel"
        class="red text-grey-darken-1"
          height="500"
          cycle
          hide-delimiter-background
          :show-arrows="true"

        >
          <v-carousel-item v-for="i in 11" :key="i"  cover>
            <v-sheet
             height="100%"
             cover   
             >
              <div class="d-flex fill-height justify-center align-center">
                <img :src="require(`@/assets/images/StarWarsPictures/${i}.jpg`)" alt="slide"
                lazy-src="https://picsum.photos/id/11/100/60"
                cover
                width="1200"  
                >
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col cols="2" class="hidden-xs-only  hidden-sm-only">  <roma-gold-banner /> </v-col>

     <v-col>
      <p>Welcome to buy tickets<br><b>You must login to get full access!</b></p>
    </v-col>

    </v-row>
</div>
</template>

<script>
import RomaGoldBanner from '../components/BannersComponents/RomaGoldBanner.vue'
import PizzaBanner from '@/components/BannersComponents/PizzaBanner.vue'

export default {
  components: {
    RomaGoldBanner,
    PizzaBanner
    },

  data:() => ({
  }),

  computed:{
      displaySize(){
        const currentColumn = this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm  ? 12 : 8
        return currentColumn
      },
  }
 
};
</script>



<style scoped>

b {
  text-decoration: none;
  color: inherit;
  font-size: 18px;
}

p {
  font-weight: 700;
  text-align: center;
  font-size: 40px;
  font-family: Hack, sans-serif;
  text-transform: uppercase;
  background: linear-gradient(90deg, rgb(233, 6, 6), rgb(22, 21, 21), rgb(134, 53, 53));
  letter-spacing: 5px;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-repeat: no-repeat;
  background-size: 80%;
  animation: shine 7s linear infinite;
  position: relative;
}

@keyframes shine {
  0% {
    background-position-x: -500%;
  }
  100% {
    background-position-x: 500%;
  }
}
</style>