<template>
  <div>
    <form class="text-center p-5 form-layout" @submit.prevent="onSubmit">
      <p class="h4 mb-4">Sign in</p>
      <input
        type="email"
        id="defaultRegisterFormUsername"
        name="email"
        class="form-control mb-4"
        placeholder="email"
        value=""
        required
      />

      <input
        type="password"
        id="defaultRegisterFormPassword"
        name="password"
        class="form-control"
        placeholder="Password"
        minlength="6"
        value=""
        required
      />
      <hr />

      <button class="btn btn-danger w-25 m-auto my-4 btn-block" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import router from "@/router"
import { singUser } from "@/service/sing";
import emitter from "tiny-emitter/instance";

export default {
  setup() {
    const onSubmit = (e) => {
      const [email, password] = e.currentTarget.querySelectorAll("input");
      if (/.+@.+\..+/.test(email.value) && password.value.length > 5) {
        singUser(email.value, password.value)
          .then((e) => {
          if (e == "ok") {
            emitter.emit("login");
          } else {
              router.push({ name: 'message', query: { 'from': 'loginFail' , 'error' : e } })
          }
          })
       
          
          
        
      }
    };

    return { onSubmit };
  },
};
</script>


<style scoped>
form {
  width: 30%;
  margin: 6em auto;
}

</style>