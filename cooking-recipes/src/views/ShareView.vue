<template>
  <form
    class="text-center p-5 form-layout"
    id="share"
    @submit.prevent="submit"
  >
    <p class="h4 mb-4">Share Recipe</p>

    <input
      type="text"
      name="meal"
      class="form-control mb-4"
      placeholder="Meal"
      required
      minlength="2"
      maxlength="50"
      value=""
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
      value=""
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
      value=""
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
      value =""
    ></textarea>

    <input
      type="text"
      name="image"
      class="form-control mb-4"
      placeholder="Food Image URL..."
      minlength="10"
      maxlength="200"
      required
      value=""
    />
    <p>{{ value }}</p>
    <select name="category" required>
      <option selected>Select category...</option>
      <option>Vegetables and legumes/beans</option>
      <option>Fruits</option>
      <option>Grain Food</option>
      <option>Milk or cheese, eggs and alternatives</option>
      <option>Lean meats and poultry, fish and alternatives</option>
      <option>Desserts</option>
      <option>Cocktails</option>
    </select>
    <div>
     <button class="btn btn-danger w-25 m-auto my-4 btn-block">Share it</button>
     
    </div>
   <p class="message">{{message}}</p>
  </form>
</template> 

<script>

import {ref, onBeforeUnmount} from "vue";
import addRecipe  from "@/service/createRecipe";
import router from "@/router"
export default {
  setup() {
    let message = ref('')

    const submit = () => {
      const form = new FormData(document.getElementById("share"));
      const meal = form.get("meal").trim();
      const ingredients = form.get("ingredients").trim();
      const preparation = form.get("preparation").trim();
      const description = form.get("description").trim();
      const image = form.get("image").trim();
      const category = form.get("category");
      // console.log(meal, ingredients, preparation, description, image, category)
      if (  category !== "Select category..." && /[http://|https://]/.test(image)  ) {
      
          addRecipe({
              meal, ingredients, preparation, description, image, category, likes: 0, voters: [],
              creatorId: JSON.parse(localStorage.getItem('auth')).uid
              })
            .then(() => {
              document.querySelector("#share").reset()
              console.log("Success add new recipe")
              router.push({ name: 'message', query: { 'from': 'share' }})
            })
          .catch((e) => console.log(e.error));
      } else {
          console.log('wrong input');
          message.value = "Wrong input field/s or not select category!"
          setTimeout(() => message.value = '', 3000)
      }
    };

onBeforeUnmount(()=>  document.querySelector("#share").reset()  )

    return { submit, message};
  },
};
</script>

<style scoped >
.message {
  color: red;
  position: relative;
  bottom: 1.2em;
}

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