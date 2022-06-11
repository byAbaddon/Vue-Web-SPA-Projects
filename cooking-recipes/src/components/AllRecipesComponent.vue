<template>
  <article>
    <section v-if="isNoRecipes"  >
      <div class="home-after-login">
        <h1 class="title">Our Recipes:</h1>
        <div>
          <img class="WTF" style="display: none" />
          <!-- WTF-->
          <img id="chef" src="@/assets/images/chef.jpeg" alt="" width="500px" />
        </div>
        <h4 style="">Food Not Found...</h4>
      </div>
      <h6>
        Press <router-link to="/share"><span>ShareRecipe</span></router-link> to
        add new recipe
      </h6>
    </section>

    <section class="recipes-section" v-else>
      <div class="home-after-login">
        <h1 class="title">Our Recipes:</h1>
      </div>
      <div
        class="container"
        v-for="(recipe, index) in allRecipesByCategory"
        :key="index"
      >
        <div class="row">
          <div class="col-lg-12">
            <div class="our-team-main">
              <div class="team-front">
                <img :src="recipe.image" />
                <h3>{{ recipe.meal }}</h3>
                <p>{{ recipe.category }}</p>
              </div>

              <!-- back side -->
              <div class="team-back">
                <div class="back-side-info">
                  <h4>Ingredients</h4>
                  <ul>
                    <li
                      v-for="(ingredient, index) in recipe.ingredients
                        .split('.')
                        .splice(0, 13)"
                      :key="index"
                    >
                      {{ ingredient }}
                    </li>
                  </ul>
                  <p class="link" @click="goToDetailsComponent"> 
                    <router-link
                      :to="{ name: 'details', params: { id: recipe.id } }"
                    >
                      <a>View the recipe</a>
                    </router-link>
                  </p>
                </div>
                <!-- <img class="WTF" style="display: none" /> -->
                <!-- <img class="foodImage"   src="{{foodImageURL}}" />    -->
                <img class="foodImage"  :src="recipe.image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <h4 style="color: red">{{ test }}</h4>
  </article>
</template>


<script>
import useSnapshotRecipes from "@/composables/useSnapshotRecipes";
import { useRoute } from "vue-router";
import { ref, computed,} from "vue";

export default {
  setup() {
    let allRecipes = ref(useSnapshotRecipes());
    const currentCategory = useRoute().query.type;

    let allRecipesByCategory = computed(() =>
      allRecipes.value.filter(
        (x) => x.category.split(" ")[0].toLowerCase() == currentCategory
      )
    );

    let isNoRecipes = computed(() => allRecipesByCategory.value == 0);

    return { isNoRecipes, allRecipesByCategory };
  },
};
</script>



<style scoped>
/* .link {
  position: relative;
left: 55em;
bottom: 2em;
} */

.title {
 color: darkkhaki;
 font-weight: bold;
}

@keyframes fadeIn { 
  0% { opacity: 0; }
  20% { opacity: 0; }
  40% { opacity: 0.3; }
  60% { opacity: 0.5; }
  80% { opacity: 0.8; }
  100% { opacity: 1; }
 
}

#chef {
   animation-duration: 0.3s;
   animation-name: fadeIn;
  
}

li {
  font-size: smaller;
  /* color: darkgoldenrod; */
}

.home-after-login h1 {
  margin-top: 1em;
}
.back-side-info > h4:nth-child(2) {
  font-size: 0;
}

h1 {
  color: darkkhaki;
  margin: 40px 0 60px 0;
  font-weight: 300;
}

.our-team-main {
  width: 100%;
  height: auto;
  border-bottom: 5px #323233 solid;
  background: transparent;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: 0.5s;
  margin-bottom: 28px;
  color: black;
}

.our-team-main img {
  border-radius: 10px;
  margin-bottom: 5px;
  width: 40%;
  height: 18em;
  box-shadow: 0 0 0.2rem 0 rgba(68, 68, 68, 0.2);
}

.our-team-main h3 {
  font-size: 26px;
  font-weight: 700;
}

.our-team-main p {
  margin-bottom: -1em;
  padding-bottom: 10px;
}

.team-back {
  width: 100%;
  height: 40em;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 0 15px;
  text-align: left;
  background: rgb(240, 240, 240,1);
  color: black;
}

.team-front {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 10;
  background: rgb(240, 240, 240,1);
  padding: 15px;
  bottom: 0px;
  transition: all 0.5s ease;
}

.team-front h3{
  color:grey;
}
.team-front p{
  color:darkgoldenrod;
  font-style: italic;
}
.our-team-main:hover .team-front {
  bottom: -400px;
  transition: all 0.5s ease;
}

.our-team-main:hover {
  border-color: #777;
  transition: 0.5s;
  background: white;
}

.back-side-info {
  display: inline-block;
  width: 50%;
}

.back-side-info h4 {
  color:crimson;
}

.back-side-info a {
  color: darkblue;
  font-weight: bold;
}

.back-side-info a:hover {
  text-decoration: underline;
}

nav a:hover {
  color: white;
}

.foodImage {
  float: inline-end;
  padding-top: -46em;
  position: relative;
  bottom: 1em;
  right: 4em;
}

#foodNotFound {
  margin: 0 auto;
  text-align: center;
  font-style: italic;
}

#foodNotFound img {
  height: auto;
  border-radius: 15px;
}

form textarea {
  height: 100vh;
  resize: none;
}

.detailsIngredients {
  display: inline-block;
  vertical-align: top;
  width: 29%;
  word-wrap: break-word;
}

.detailsFoodImage {
  display: inline-block;
  width: 69%;
  margin-right: 1%;
}

.detailsFoodImage img {
  width: 350px;
  height: auto;
  border: 1px solid white;
}

.actions {
  width: 100%;
}

.prep-method,
.description {
  width: 100%;
  word-wrap: break-word;
}

.infoPack {
  vertical-align: top;
  display: inline-block;
  width: 100%;
}

.recepieInfo {
  display: inline-block;
  width: 70%;
}

.ingredient {
  text-align: center;
}

#successBox,
#loadingBox,
#errorBox {
  display: none;
  text-align: center;
}

/*our-team-main*/

/* no recipe */
.home-after-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
}

h1 {
  color: lavender;
  text-decoration: underline;
  margin-bottom: 1em;
}
.home-after-login h1 {
  position: relative;
  bottom: 2em;
  margin-bottom: 0;
}

h4 {
  color: lavender;
}

h6 {
  color: cornflowerblue;
  text-align: center;
}

h6 span {
  color: antiquewhite;
  text-decoration: underline;
}
h6 span:hover {
  color: grey;
}
img {
  border-radius: 10px;
  margin: 3em auto;
}
</style>