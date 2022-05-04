<template>
  <v-card class="mx-auto blue-grey lighten-4" max-width="210" height="500">
    <v-img
      class="align-center"
      height="200"
      src="../../assets/images/pictures/pizza.jpeg"
      cover
    >
      <v-card-title class="yellow--text font-weight-bold" >
         <div class="waviy">
   <span style="--i:1">P</span>
   <span style="--i:2">I</span>
   <span style="--i:3">Z</span>
   <span style="--i:4">Z</span>
   <span style="--i:5">A</span>
   <span style="--i:6">-</span>
   <span style="--i:7">K</span>
   <span style="--i:8">I</span>
   <span style="--i:9">N</span>
   <span style="--i:10">G</span>
   <span style="--i:10">'</span>
   <span style="--i:11">S</span>
  </div>
          </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4 font-weight-bold">
      Amazing pizza bar, with excellent ambient music!
    </v-card-subtitle>

    <v-card-text>
      <div class="text">
        What you can expect during your visit Face masks required for staff in
        public areas.
      </div>
    </v-card-text>

    <v-card-actions>
      <v-icon size="24" color="warning" class="mr-12">mdi-pizza</v-icon>
      <v-chip color="teal" class="teal darken-2">Visit Us</v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
span {
  position: relative;
  display: inline-block;
  font-size: 26px;
  color: #fff;
  text-transform: uppercase;
  animation: flip 2s infinite;
  animation-delay: calc(.2s * var(--i))
}

 @keyframes flip {
  0%,80% {
    transform: rotateY(360deg) 
  }
 }

</style>