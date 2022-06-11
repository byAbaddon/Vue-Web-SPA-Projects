<template>
  <section>
    <h1>Select category:</h1>
    <article>
      <div v-for="(category, index) of categoryObj" :key="index">
        <p>{{ category.type }}</p>
        <img
          :src="require(`../assets/images/category/${category.img}.jpg`)"
          alt="image"
          @click="selectCategory(category.type)"
        />
      </div>
    </article>
  </section>
</template>

<script>

import router from "@/router";
import {reactive,} from "vue";

export default {
  setup() {
    const categoryObj = reactive({
      1: {
        type: "Vegetables and legumes/beans",
        img: "vege",
      },

      2: {
        type: "Grain Food",
        img: "grain",
      },
      3: {
        type: "Lean meats and poultry, fish and alternatives",
        img: "lean",
      },

      4: {
        type: "Milk & cheese, eggs and alternatives",
        img: "milk",
      },
      5: {
        type: "Fruits",
        img: "fruit",
      },

      6: {
        type: "Desserts",
        img: "desserts",
      },

      7: {
        type: "Cocktails",
        img: "cocktails",
      },
    });

    const selectCategory = (e) => {
      const currentCategory = e.split(" ")[0].toLowerCase();
      router.push({
        path: "/category/recipe",
        query: { type: currentCategory },
      });
    };
    return { categoryObj, selectCategory};
  },
};
</script>


<style scoped>
article {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-flow: wrap;
}

article div {
  margin-bottom: 4em;
}

h1 {
  color: wheat;
  text-align: center;
  margin-bottom: 1em;
}

article img {
  border-radius: 8px;
  width: 400px;
  min-height: 250px;
  max-height: 250px;
}
article p {
  color: mistyrose;
  text-align: center;
  font-style: italic;
  text-decoration: underline;
}

article img:hover {
  cursor: pointer;
  padding: 6px;
  background-image: linear-gradient(red, orange);
  opacity: 0.9;
}
</style>