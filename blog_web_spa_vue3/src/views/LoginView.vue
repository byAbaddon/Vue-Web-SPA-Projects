<template>
  <section id="login">
    <h2 class="message"></h2>
    <div class="color">
      <div class="login-form">
        <h1>Login</h1>
        <form id="form" @submit.prevent="submitLogin">
          <label for="email">Email</label>
          <input type="text" name="email" placeholder="required" value="" />
          <label for="password">Password</label>
          <input type="password" name="password" placeholder="6 symbols minlength"  value="" />
          <div id="btn">
            <button id="btnSubmit">Login</button>
            <button
              @click.prevent="btnReset"
              style="color: red; background: lightpink"
            >
              Reset
            </button>
          </div>

          <router-link to="/register" class="option"
            >Don't have an account?</router-link
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import loginUser from "@/services/login";
import emitter  from 'tiny-emitter/instance'

export default {


  methods: {
    btnReset(e) {
      e.target.parentElement.parentElement.reset()
    },

    submitLogin(e) {
      let formData = new FormData(e.target);
      let email = formData.get("email");
      let password = formData.get("password");

      if (/\w{2,}@\w{2,}\.\w{2,}/.test(email) && password.length > 5) {
         e.target.reset();
         
        loginUser(email, password).then((message) => {
          document.querySelector("#btnSubmit").style.color = "green"; 
          document.getElementsByClassName("message")[0].textContent = message;
          if (message == "Success") {
            emitter.emit('login')  //emit ...................................
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          } else{
              document.querySelector("#btnSubmit").style.color = "white";
          }
          // setTimeout(() => {
          //   document.querySelector("#btnSubmit").style.color = "white";
          //   document.getElementsByClassName("message")[0].textContent = "";
          // }, 1500);
        });
      }
    },
  },
};
</script>

<style scoped>

.message {
  position: absolute;
  top: 5em;
  color: gold;
  text-decoration: underline;
}

#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background: url("@/assets/images/login.jpg");
  background-size: cover;
  
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 50px 30px;
  background: aliceblue;
  /* margin-top: 80px; */
  border-radius: 5px;
  background: linear-gradient(#c82b2bc9, #c0d9ff);
}

.login-form label {
  margin: 10px 0;
}

.login-form h1 {
  margin-bottom: 30px;
  font-size: 40px;
  padding: 10px 50px;
}

#login form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#login input[type="text"],
#login input[type="password"] {
  font-size: 18px;
  padding: 11px 20px;
  outline: none;
  border: none;
  background: rgb(230, 230, 230);
  border-radius: 5px;
}

#login button {
  font-size: 18px;
  padding: 8px 10px;
  border: none;
  background: cornflowerblue;
  color: #fff;
  margin-top: 30px;
  margin-left: 2.5em;
  border: double;
  border-radius: 5px;
}

#login button:hover {
  cursor: pointer;
}

.option {
  align-self: center;
  margin-top: 30px;
  text-decoration: none;
  color: sienna;
}

.color {
  height: 100%;
  width: 100%;
  background: #2121218a;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>