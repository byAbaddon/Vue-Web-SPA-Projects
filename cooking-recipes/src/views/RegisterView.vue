<template>
  <form class="text-center p-5 form-layout" @submit.prevent>
    <p class="h4 mb-4">Sign up</p>
  
    <div class="form-row mb-4 user-names">
      <div class="col">
        <input
          v-model.trim="formData.firstName"
          type="text"
          id="defaultRegisterFormFirstName"
          class="form-control"
          name="firstName"
          placeholder="First name"
          minlength="2"
          maxlength="16"
          required
        />
      </div>
      <div class="col">
        <input
          v-model.trim="formData.lastName"
          type="text"
          id="defaultRegisterFormLastName"
          class="form-control"
          name="lastName"
          placeholder="Last name"
          minlength="2"
          maxlength="16"
          required
        />
      </div>
    </div>

    <input
     v-model.trim="formData.email"
      type="email"
      id="defaultRegisterFormUsername"
      class="form-control mb-4"
      name="email"
      placeholder="email"
      maxlength="26"
      required
    />
    <input
      v-model="formData.password"
      type="password"
      id="defaultRegisterFormPassword"
      class="form-control"
      name="password"
      placeholder="Password"
      minlength="6"
      maxlength="16"
      required
    />
    <hr />
    <input
      v-model="formData.rePassword"
      type="password"
      id="defaultRegisterRepeatPassword"
      class="form-control"
      name="repeatPassword"
      placeholder="Repeat Password"
      minlength="6"
      maxlength="16"
      required
    />
    <button
     :disabled="isFormFilledCorrect"
     @click="submit"
     @keypress.enter="submit"
     class="btn btn-danger my-4 btn-block w-25 m-auto" >
      Sign up
    </button>
  </form>
</template>

<script>
import { reactive, computed  } from 'vue' 
import { registrationNewUser } from '@/service/register'
import router from "@/router"

export default {
  setup() {
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password:'',
      rePassword:'',
    })

   const submit = () => {
     console.log('Submit');
     registrationNewUser(formData).then(e => {
       if (e != 'ok') {
         router.push({ name: 'message', query: { 'from': 'regFail', 'error': e } }) 
       }
     }) 
   }
    
    const isFormFilledCorrect = computed( () => { 
      return Object.values(formData).some(x => x.length < 2 
      || formData.password.length < 6
      || formData.password !== formData.rePassword
      || !/\w{2,}@\w{2,}\.\w{2,}/.test(formData.email))
   })

     return {formData, submit, isFormFilledCorrect}
  }
}
</script>




<style scoped>
form {
  width: 30%;
  margin: 6em auto;
}
.my-4{
  margin-bottom: 0;
}

#defaultRegisterFormLastName {
  margin-top: 1.3em;
}
</style>