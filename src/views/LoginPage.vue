
<template >
  <div>
    <v-card class="mx-auto my-6" max-width="360"  max-height="100">
      <v-card-title class="d-flex justify-center blue lighten-1 text-red">
        <span class="white--text">LOGIN FORM</span>
      </v-card-title>

      <v-img
        src="@/assets/images/background/loginUser.jpeg"
        lazy-src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fjohannesippen.com%2Fimg%2Fblog%2Fhumans-not-users%2Fheader.jpg&sp=1649872596T2df0fb122f3a588a8bfb58d76fefa957808b5d9b8c2924cf82e7f451f90f9741"
        height="230px"
        cover
        eager
      ></v-img>

      <v-form class="blue lighten-3">
        <!-- email   -->
        <v-text-field
          style="height:100px;"
          class="my-0 pa-5 py-10"
          prepend-inner-icon="mdi-email mr-3 mt-1"
          append-icon="mdi-blank"
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          type="email"
          required
          clearable
        >
          <!-- <v-icon large  color="blue-darken-1 mr-2">   mdi-email</v-icon> -->
        </v-text-field>

        <!-- password   -->
        <v-text-field
          style="height: 100px;"
          class="mx-5"
          prepend-inner-icon="mdi-lock mr-3"
          clearable
          label="Password"
          v-model="pass"
          :rules="passRules"
          :counter="6"
          required
          :append-icon="showPass ? 'mdi-eye ' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
        ></v-text-field>

        <!-- btnLogin   -->
        <div class="text-center mt-0 pb-5">
          <v-btn
            class="blue white--text"
            :disabled="showProgressCircular"
            elevation="8"
            :loading="showProgressCircular"
            @click="login"
          >Login
          </v-btn>
        </div>
      </v-form>
    </v-card>

    <!-- alert   -->
    <div>
      <v-alert
        class="mx-auto mt-9"
        height="50"
        width="22.5em"
        type="error"
        icon="mdi-alert"
        v-show="showErrorAlert"
      >
        {{ errorMessage }}
      </v-alert>
    </div>

  </div>
</template>


<script>
import singUser from "@/service/login";

export default {
  name: 'LoginPage',
  emits:['login-user'],
  props:['name'],

  data: () => ({   
    errorMessage: "",
    showErrorAlert: false,
    showProgressCircular: false,
    showPass: false,
    pass: "111111",
    email: "koko@abv.bg",

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    passRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length > 5) || "Password must be more than 5 characterds",
    ],
  }),

  methods: {
    login() {
      this.showProgressCircular = true;
      setTimeout(() => (this.showProgressCircular = false), 3000);
      //invoke login function
      singUser(this.email, this.pass).then(args => {
        const [message, name] = args
        if (message == 'success') {   
           this.$router.push('/movies') //redirect to page
           this.$root.$emit('login-user', name)   
        }else{
          this.errorMessage = message
          this.showErrorAlert = true;
          setTimeout(() => (this.showErrorAlert = false), 3000);
        }
        
      });
    },
  },

};

</script>

<style  scoped>

</style>

