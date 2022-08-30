<script setup>
import { onMounted } from "vue";
import {useRouter, useRoute  } from "vue-router";
import { useTrekStore } from "../stores/treks";
import { useDataStore } from "../stores/userData";

const trekStore = useTrekStore()    
const userData = useDataStore()
const router = useRouter()

onMounted(() =>  trekStore.updateTreks())

const onBtnTrek = (e => {
  router.push({ name: 'detailsTrek', params: { id: e.id }})
})
</script>

<template>
  <!--  user login no trek-->
  <div v-if="!userData.isAuth" class="home d-md-flex flex-md-equal my-6" style="height: 90%; width: 60%; min-width: 20em;" >
    <div style="padding-top: 3%" class="col-md-7 mx-auto">
      <h2 class="featurette-heading">
        Here you will find the treks you've
        <span class="text-highlighted">always dreamed about!</span>
      </h2>
      <p class="lead d-flex ml-12">1. Join our family.</p>
      <p style="" class="lead ml-8">2. Request the trek you've always wanted.</p>
      <p style="padding-left: 0%" class="lead">
        3. Find people who like your idea.
      </p>
      <p class="lead ml-9">
        4. Find people who like your idea.
      </p>
      <p class="lead mt-12">
        If you find enough supporters, we will organize everything for you!
      </p>
    
   </div>
    <div class="col-md-5">
      <img
        class="home-picture"
        :src="'../src/assets/images/mountainLogo.png'"
      />
    </div>
  </div>

  <!--  user login -->
  <div v-else>
    <!--  user login but not have any trek-->
    <div v-if="!trekStore.allTreks" class="container">
      <div class="row">
        <div class="col-md-12">
          <div id="fouronefour">
            <img class="no-found-picture" src="../assets/images/empty.jpg" />
          </div>
          <div class="no-found-template">
            <h1>There aren't any treks, yet!</h1>
            <h2>What do you have in mind?</h2>
            <div class="no-found-details">Be the first explorer!</div>
            <div class="actions mt-3">
              <router-link to="/add-trek">
                <a class="btn btn-dark btn-lg">Create the first trek </a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  list of treks-->
    <div v-else>
      <div class="my-4 mx-auto">
        <v-row  class="mx-auto">
          <v-col v-for="(trek, index) in trekStore.allTreks" :key="index" col="4"  class="d-flex child-flex" >
            <div
              style="min-width: 20rem"
              @click="onBtnTrek(trek)"
              class=" treksPlaceholder trek-details trek-hover "
            >
              <div class="mt-1">
                <p class="card-text">{{trek.location}}</p>
              </div>

            <div style="max-width:320px ;" class="mt-4 mb-3   mx-auto my-auto">
                <v-img
                  :src="trek.imageURL"
                  :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
                  aspect-ratio="1.3"
                  cover
                >
                </v-img>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>






<style>
</style>