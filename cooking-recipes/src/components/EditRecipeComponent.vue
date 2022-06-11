<template>
  <form
    class="text-center p-5 form-layout"
    id="share"
    ref="form"
    @submit.prevent="submit"
  >
    <p class="h4 mb-4">Edit Recipe</p>

    <input
      type="text"
      name="meal"
      class="form-control mb-4"
      placeholder="Meal"
      required
      minlength="2"
      maxlength="50"
      v-model.trim="dataFrom.meal"
    />

    <input
      type="text"
      name="ingredients"
      class="form-control mb-4"
      placeholder="Ingredients. Attention! Put DOT, in every row end!"
      rows="13"
      minlength="10"
      maxlength="1000"
      required
      v-model.trim="dataFrom.ingredients"
    />

    <textarea
      type="text"
      name="preparation"
      class="form-control mb-4"
      placeholder="Method of preparation"
      rows="13"
      minlength="10"
      maxlength="1000"
      required
      v-model.trim="dataFrom.preparation"
    ></textarea>

    <textarea
      type="text"
      name="description"
      class="form-control mb-4"
      placeholder="Description"
      rows="13"
      minlength="10"
      maxlength="1000"
      required
      v-model.trim="dataFrom.description"
    ></textarea>

    <input
      type="text"
      name="image"
      class="form-control mb-4"
      placeholder="Food Image URL..."
      minlength="10"
      maxlength="200"
      required
      v-model.trim="dataFrom.image"
    />
    <select name="category" required  v-model.trim="dataFrom.category">
      <option selected>Select category...</option>
      <option>Vegetables and legumes/beans</option>
      <option>Fruits</option>
      <option>Grain Food</option>
      <option>Milk, cheese, eggs and alternatives</option>
      <option>Lean meats and poultry, fish and alternatives</option>
      <option>Desserts</option>
      <option>Cocktails</option>
    </select>
 <div>
    <button class="btn btn-danger w-25 m-auto my-4 btn-block">Edit</button>
 </div>
   
  </form>
</template> 

<script>
import router from "@/router";
import { useRoute } from "vue-router";
import editCurrentRecipe from "@/service/editRecipe";
import loadRecipe from "@/service/getCurrentRecipe";
import { ref, watchEffect } from "vue";



export default {
  setup() {
    let recipeId = useRoute().params.id
    let dataFrom = ref('')
 

   
    loadRecipe(recipeId)
        .then((data) => dataFrom.value = data)
        .catch((e) => console.log(e.error))

    watchEffect(()=> dataFrom  )
   
    const submit = () => {
      const form = new FormData(document.getElementById("share"));
      const meal = form.get("meal");
      const ingredients = form.get("ingredients")
      const preparation = form.get("preparation");
      const description = form.get("description")
      const image = form.get("image")
      const category = form.get("category");

      // console.log(meal, ingredients, preparation, description, image, category)
      if (
        category !== "Select category..." &&
        /[http://|https://]/.test(image)
      ) {
        editCurrentRecipe( recipeId ,{ meal, ingredients, preparation, description, image, category})
          .then(() => {
            router.push({ name: 'message', query: { 'from': 'edit' } })
            console.log("Success edit recipe")
          })
          .catch((e) => console.log(e.error));
      }
    };

    return { submit, dataFrom };
  },
};
</script>

<style scoped >
form {
  width: 38%;
  height: 40em;
  margin: 0 auto;
  margin-top: 2em;
}

textarea {
  height: 6em;
}
</style>