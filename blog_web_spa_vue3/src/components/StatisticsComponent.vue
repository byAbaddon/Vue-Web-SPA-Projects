<template>
  <div>
    <h1>Statistics</h1>
    <div class="data">
      <h3>
        Data: <span class="dataNow">{{ new Date().toDateString() }}</span>
      </h3>
      <h3 class="total">
        Total posts: <span class="spanTotal">{{ totalPosts }}</span>
      </h3>
      <h3 class="user">
        Current user posts: <span class="spanUser">{{ userPosts }}</span>
      </h3>
    </div>
    <section></section>
  </div>
</template>

<script>
import { getAllPosts } from "@/services/getAllPosts";

export default {
  data: () => ({
    currentUserEmail: JSON.parse(localStorage.getItem("auth")).email,
    totalPosts: 0,
    userPosts: 0,
  }),

  mounted() {
    getAllPosts().then((posts) => {
      this.totalPosts = posts.length;
      this.userPosts = posts.filter(
        (x) => x.creatorEmail == this.currentUserEmail
      ).length;
    });
  },
};
</script>


<style scoped>
section {
  background: url("../assets/images/statistics/statistics.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 60vh;
  width: 80%;
  margin: 1em auto 6.5em;
}

h1 {
  color: darkblue;
  text-align: center;
  padding-bottom: 0em;
  font-style: underline;
  text-transform: uppercase;
  text-decoration: underline;
}

.data {
  display: flex;
  flex-direction: row;
  text-align: center;
  color: #553fdb;
  justify-content: space-evenly;
}

.total {
  margin-right: 4.6em;
  margin-left: 3em;
}

.spanTotal {
  color: crimson;
}

.spanUser {
  color: maroon;
}

.dataNow {
  color: red;
}
</style>

