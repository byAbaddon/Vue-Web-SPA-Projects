
<template>
  <form
    id="edit-form"
    class="text-center p-5 form-layout"
    @submit.prevent="editSubmit"
  >
    <p class="h4 mb-4">Edit Recipe</p>

    <input
      type="text"
      name="meal"
      class="form-control mb-4"
      placeholder="Meal"
      :value="recipe.meal"
    />

    <input
      type="text"
      name="ingredients"
      class="form-control mb-4"
      placeholder="Ingredients"
      :value="recipe.ingredients"
    />

    <textarea
      type="text"
      name="preparation"
      class="form-control mb-4"
      placeholder="preparation"
      v-model="recipe.preparation"
    ></textarea>

    <textarea
      type="text"
      name="description"
      class="form-control mb-4"
      placeholder="Description"
      v-model="recipe.description"
    >
    </textarea>

    <input
      type="text"
      name="image"
      class="form-control mb-4"
      placeholder="Image URL..."
      :value="recipe.image"
    />

    <select name="category" select="">
      <option selected>Select category...</option>
      <option>Vegetables and legumes/beans</option>
      <option>Fruits</option>
      <option>Grain Food</option>
      <option>Milk & cheese, eggs and alternatives</option>
      <option>Lean meats and poultry, fish and alternatives</option>
      <option>Desserts</option>
      <option>Cocktails</option>
    </select>
    <button class="btn btn-danger w-25 m-auto my-4 btn-block" type="submit">
      Edit it
    </button>
  </form>
</template>

<script>
import router from "@/router"
import { useRoute } from "vue-router";
import editRecipe from "@/service/editRecipe";
import {  } from "vue";

export default {


  setup() {
    const route = useRoute();
    const id = route.params.id;

 

    const editSubmit = () => {
      const form = new FormData(document.getElementById("edit-form"));
      const meal = form.get("meal");
      const ingredients = form.get("ingredients");
      const preparation = form.get("preparation");
      const description = form.get("description");
      const image = form.get("image");

      editRecipe(id, { meal, ingredients, description, preparation, image })
        .then(() => {
          console.log("Recipe edit Success")
          setTimeout(() => {
            
           router.push('/recipe')
          }, 1000);
            router.push('/login')
        })
        .catch((e) => console.log(e.error));
    };

    return {  editSubmit };
  },
};
</script>

<style scoped>
form {
  width: 38%;
  margin: 1em auto;
}
</style>