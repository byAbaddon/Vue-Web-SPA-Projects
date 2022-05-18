<template>
  <section id="home">
    <div v-if="!isAuth" class="secondTabLinks">
      <a v-for="(button, index) in buttons" :key="index" @click="onCurrentLink"
        >{{ button }}
      </a>
    </div>
 
  <!-- body section  -->   
    <section class="background-container" v-show="isAuth">
      <h1>Welcome to MyBlog!</h1>
      <div class="auth-buttons">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </section>

   <!-- body two section -->
     <section class="welcome" :style="`${isAuth ? null : 'display:block'}`"  >
   
      <div class="content">
        <h2>Blogging</h2>
        <h2>Blogging</h2>

        <!-- dots -->
        <div class="waviy">
          <span style="--i: 1">.</span>
          <span style="--i: 2">.</span>
          <span style="--i: 3">.</span>
        </div>
      </div>
          
        <!-- line -->
        <div class="arrows">_________</div>
    </section>
  </section>
</template>

<script>

export default {
  data: () => ({
    isAuth: localStorage.getItem("auth") == null, //user not login
    buttons: ["Posts", "Create", "Statistics"],
    isShowAll: false,
  }),

  methods: {
    onCurrentLink(e) {
      const link = e.target.textContent.toLowerCase();
      this.$router.push(link);
    },
  },
  
};
</script>


<style scoped>
.welcome{
  display: none;
}


@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

.content {
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin-right: 36em;
}

.content h2 {
  color: black;
  font-size:10em;
  position: absolute;
  transform: translate(37%, 50%);
}

.content h2:nth-child(1) {
  /* color: transparent; */
  -webkit-text-stroke: 2px  white;
}

.content h2:nth-child(2) {
 color: #d2481d;
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}

/* dots */
.waviy {
position: relative;
top: 1.5em;
left: 4.8em;
font-size: 10em;
}
.waviy span {
  display: inline-block;
  color: rgb(228, 76, 15);
  animation: waviy 1s infinite;
  animation-delay: calc(.1s * var(--i));
  
}
@keyframes waviy {
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-20px)
  }
}

/* line */
.arrows {
  position: relative;
  -webkit-animation: arrows-9ea40744 3s infinite;
  animation: arrows-9ea40744 3s infinite;
    animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation: arrows-9ea40744 3s;
    animation-iteration-count: 1;
  -webkit-animation-iteration-count: infinite;
  color: orangered;
  font-size: 3em;
 top: 4.5em;
  width: 18%
}
@keyframes arrows {
  0% {
    left: 10%;
  }
  100% {
    left: 80%;
  }
}


/* Bloging Text Animation  END*/


.secondTabLinks {
  display: flex;
  justify-content: center;
  background: darkgray;
  padding: 0.3em;
}
.secondTabLinks a {
  color: #212121;
  margin: 0 1em;
  text-decoration: none;
  font-weight: bold;
}

.secondTabLinks a:hover {
  color: white;
  cursor: grab;
}

#home {
  background: url("@/assets/images/home.jpg");
  background-size: cover;
  background-position: center;
  height: 90vh;
  width: 100%;
}

.background-container {
  flex: 1;
  background: hsla(0, 0%, 13%, 0.384);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.background-container > h1 {
  color: #fff;
  font-size: 50px;
}

#home-logged {
  display: inline-block;
  color: darkblue;
  text-decoration: none;
  background: gainsboro;
  padding: 10px 25px;
  font-size: 20px;
  margin: 50px 20px;
  transition: transform 0.3s;
  border: 1px solid darkblue;
  border-radius: 12px;
  transition: transform 0.3s;
}

.background-container a {
  display: inline-block;
  color: white;
  text-decoration: none;
   background: rgb(11, 109, 207);
  padding: 10px 25px;
  font-size: 20px;
  margin: 50px 20px;
  transition: transform 0.3s;
  border-radius: 12px;
  transition: transform 0.3s;
}

.background-container a:hover {
  transform: scale(1.1);
}

/* Logged In */
.first-section {
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("@/assets/images/home.jpg");
  background-size: cover;
  background-position: center;
}
</style>
