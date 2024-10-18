<template>
  <div style="background: #101551;" class="container text-center">
    <v-footer app class="footer" :style="!isBtnAgreeVisible ? 'max-height: 8em;' : null">
      <v-row justify="center" no-gutters>
        <v-col cols="12" v-show="isBtnAgreeVisible">
          <v-btn @click="btnAgree" outlined small color="error" class="text-center mt-6"> Agree </v-btn>
        </v-col>

        <v-col cols="12" class="text-center">
          <div v-show="isBtnAgreeVisible" class="font-italic text-white text-center">
            We use cookies - they help us give you the best possible experience!
          </div>
        </v-col>
        <v-col v-show="!isBtnAgreeVisible" class="text-center">
          <div class="author font-bold text-white text-center flex">
            <span>by Abaddon</span>

            <v-btn @click="btnUp" icon size="26" :class="btnUpAnimation" variant="outlined">
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>


            <!-- <span>Vue3 - Composition - Pinia - Vuetify3</span> -->
            <span>Copyright 2024</span>
          </div>
        </v-col>
      </v-row>




    </v-footer>
  </div>
</template>



<script setup>
import { ref } from 'vue'

const isBtnAgreeVisible = ref(true)
const btnUpAnimation = ref('color-change-animation')



const btnAgree = () => {
  isBtnAgreeVisible.value = false
}


const btnUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}


</script>



<style scoped>

.footer {
  background: #101551;
  background-image: url('/assets/images/lent.png');
  background-size: cover;
  background-repeat: no-repeat;
  padding: 12px;
}

.author {
  display: flex;
  justify-content: space-between;
}

span {
  text-shadow: 1px 1px 1px rgb(189, 179, 179);

}


@keyframes colorChange {
  0% {
    background-color: red;
  }

  50% {
    background-color: rgb(119, 45, 45);
  }

  100% {
    background-color: red;
  }
}

.color-change-animation {
  animation: colorChange 3s 3;
}
</style>