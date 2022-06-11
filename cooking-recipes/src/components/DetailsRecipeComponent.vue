<template>
  <div class="row form-layout p-5" >
    <div  class="col-md-12">
      <div class="recepieInfo">
        <div class="detailsFoodImage">
          <img :src="currentRecipe.image" alt="foodImageURL" width="300" />
        </div>

        <div class="infoPack">
          <h3 class="my-3">{{ currentRecipe.meal }}</h3>
          <p class="prep-method">{{ currentRecipe.preparation }}</p>
          <p class="description">{{ currentRecipe.description }}</p>
        </div>

        <div class="detailsIngredients">
          <h3 class="my-3 ingredient">Ingredients</h3>
          <ul
            v-for="(ingredient, index) of currentRecipe.ingredients
              ? currentRecipe.ingredients.split('.')
              : null"
            :key="index"
          >
            <li>{{ ingredient }}</li>
          </ul>
        </div>

        <div class="actions">
          <div v-if="owner == currentRecipe.creatorId">
            <a class="btn btn-info" @click="editRecipe">Edit</a>
            <a class="btn btn-danger" @click="archiveRecipe" >Delete</a>
            <a class="btn btn-warning" @click="btnBack">Back</a>
          </div>
          <div v-else>
            <a class="btn btn-success" @click="btnOnLike"
              >Likes: {{ currentRecipe.likes }}</a>       
            <a id="btnBackTwo" class="btn btn-warning" @click="btnBack">Back</a>
          </div>      
        </div>      
      </div>
    </div> 
  </div>

</template>

<script>

import deleteRecipe  from '@/service/deleteRecipe'
import { loadDetails } from "@/service/detailsRecipe";
import  updateRecipeLike from '@/service/likeRecipes'
import router from "@/router";
import { useRoute } from "vue-router"
import { ref, onUnmounted} from "vue";

export default {

  setup() {
    let owner = ref(JSON.parse(localStorage.getItem('auth')).uid );
    let recipeId = useRoute().params.id;
    let currentRecipe = ref("");

    loadDetails(recipeId).then((e) => (currentRecipe.value = e));
 
    document.querySelector('#footer').style.display = 'none'
    onUnmounted(() => document.querySelector('#footer').style.display = 'block')

   
    const btnOnLike = () => {
      const isAlreadyVote = currentRecipe.value.voters.filter(x => x == owner.value)
      if (!isAlreadyVote.length) {
        let incrementLikes = Number(currentRecipe.value.likes)
      
        updateRecipeLike(recipeId, { likes: ++incrementLikes}, owner.value) 
          .then(() => {
            console.log('Success, add new like!')
            router.push({ name: 'message', query: { 'from': 'makeLike'} })
          })
          .catch(e => {
            console.log('Error', e.error)
            router.push({ name: 'message', query: { 'from': 'makeLike' , 'error' : e } }) 
            })
         
       
      } else {
        console.log('You already making vote in this recipe!');
         router.push({ name: 'message', query: { 'from': 'alreadyLike'} })
      }
    

    }

    const archiveRecipe = () => {
      deleteRecipe(recipeId)
        .then(() => {
           console.log('Success deleted recipe')
             router.push({ name: 'message', query: { 'from': 'archive' }})
        }) .catch((e) => console.log(e.error))
    } 
     
    const editRecipe = () => {
    router.push({
        path: `/category/recipe/edit/${recipeId}`,
      });
    } 

    const btnBack = () => router.go(-1)


    return { owner, currentRecipe, btnOnLike, archiveRecipe, editRecipe, btnBack};
  },
};
</script>



<style scoped>
#modal{
  display: none;
}

a{
  padding-right: 1.8em;
  padding-left: 1.8em;
  border-radius: 8px;
}
a.btn:nth-child(2){
  padding: 6px;
  padding-right: 1em;
  padding-left: 1em;
}

#btnBackTwo{
  padding-right: 2.4em;
  padding-left: 2.4em;
 }

.form-layout {
  width: 60%;
  margin: 1em auto;
  z-index: 0;
}

.detailsIngredients > ul {
  margin:0;
}

.actions{
  margin-top: 1.5em;
}

img {
 max-width: 300px;
float: inline-end;
margin: 1em;
max-height: 14em;
}

ul {
  display:flex;
}

li {
  flex-direction: row;
}

.actions a {
  margin-right:1em;
}
</style>