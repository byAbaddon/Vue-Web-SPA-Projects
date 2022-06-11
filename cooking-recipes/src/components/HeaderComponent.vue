<template>
  <header class="masthead mb-auto">
    <div class="inner">
      <h3 class="masthead-brand apple">
        <span> <i class="bi bi-apple"></i> </span> MasterChef
      </h3>

      <nav
        class="nav nav-masthead justify-content-center"
        @click.prevent="onPath"
      >
        <div v-if="!isAuth">
          <a class="nav-link">Home</a>
          <a class="nav-link">Login</a>
          <a class="nav-link">Register</a>
        </div>

        <div v-else>
          <a class="nav-link" id="ignore-hover"
            >Welcome, Chef <span>{{ userName }}</span
            >!</a
          >
          <a class="nav-link">Home</a>
          <a class="nav-link">ShareRecipe</a>
          <a class="nav-link" id="logout">Logout</a>
        </div>
      </nav>
    </div>
  </header>
</template>


<script>
import router from "@/router";
import emitter from "tiny-emitter/instance";
import { ref, onMounted } from "vue";

export default {
  setup() {
    let isAuth = ref(false);
    const userName = ref("");

    const onPath = (e) => {
      let currentPath = e.target.text.toLowerCase();

      if (currentPath == "logout") {
        //logOut
        console.log("Logout success. Storage was clear!");
        localStorage.clear();
        router.push("/");
        isAuth.value = false;
      

        return;
      }

      currentPath == "sharerecipe"
        ? (currentPath = "/share")
        : currentPath == "home"
        ? (currentPath = "/category")
        : null;
      if (currentPath.split(",")[0] != "welcome") {
        router.push(currentPath);
      }
    };

    emitter.on("login", () => {
      isAuth.value = true;
      userName.value = JSON.parse(localStorage.getItem("auth")).displayName;
      router.push("/category");
      console.log("Custom event! Login success");
    });

    onMounted(() => {
      if (localStorage.getItem("auth") != null) {  //user login
        isAuth.value = true;
        userName.value = JSON.parse(localStorage.getItem("auth")).displayName;
      }   
        router.push("/").catch(() => {})
    });

    return { userName, isAuth, onPath };
  },
};
</script>

<style scoped>
/*
 * Header
 */
h3 {
  color: green;
  font-size: 1.5em;
  margin-left: 1em;
  padding: 0.8em;
  font-weight: bold;
  /* text-decoration-line: underline; */
}

a > span {
  color: goldenrod;
}



.nav-masthead .nav-link[data-v-5c833af0] {
  padding: 1em;
}

.masthead {
  margin-bottom: 2rem;
}

.masthead-brand {
  margin-bottom: 0;
}

.nav-masthead .nav-link {
  /* padding: 0.25rem 0; */
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  background-color: transparent;
  border-bottom: 0.25rem solid transparent;
  padding:0;
}




.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.8);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead a:hover {
  color: #fff;
  border-bottom-color: white;
}

nav div {
  display: flex;
}

a {
  margin:0.5em;
}



@media (min-width: 48em) {
  .masthead-brand {
    float: left;
  }
  .nav-masthead {
    float: right;
  }

  #logout:hover {
    color: red;
  }

  #ignore-hover:hover {
    pointer-events: none;
  }
}





</style>



