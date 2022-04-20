<template>

<v-row>
   <v-col cols="12" >
     
  <v-container class="d-flex justify-center">
    <!-- image -->
    <div class="mt-12  ">
      <v-img
        src="../assets/images/background/registerUser.png"
        alt="registerPicture"
        style="background: linear-gradient(red 50%, 30%, blue 10%)"
        max-height="600"
        max-width="250" 
      >
      </v-img>
    </div>



    <!--form  -->
    <div class="d-flex ma-6 mt-12"
        :class="!$vuetify.breakpoint.xs ? 'float-none' : 'float-none'" TODO:
    >
    
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          append-icon="mdi-account-alert"
          required
        ></v-text-field>

        <v-text-field
          v-model="avatarImg"
          label="Avatar image / not required"
          append-icon="mdi-image"
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          append-icon="mdi-email-check"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          :counter="10"
          label="Password"
          required
          :append-icon="showPass ? 'mdi-eye ' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          :counter="10"
          label="Confirm Password"
          required
          :append-icon="showPassTwo ? 'mdi-eye ' : 'mdi-eye-off'"
          :type="showPassTwo ? 'text' : 'password'"
          @click:append="showPassTwo = !showPassTwo"
        ></v-text-field>

        <v-checkbox
          :v-model="checkbox"
          :rules="[(v) => !!v || 'You must fill all required fields and agree to continue!']"
          label="Do you agree?"
          required

        ></v-checkbox>

        <v-btn
          :disabled="!valid || name.length < 2 || email.length < 7 || password.length < 6 || confirmPassword < 6"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Register
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Reset Validation
        </v-btn>
      </v-form>
    </div>

 
 
  </v-container>
   </v-col>

   <v-col>
     <!-- alert   -->
    <div class="mx-auto">
      <v-alert
        class="mx-auto"
        height="50"
        width="47em"
        type="error"
        icon="mdi-alert"
        v-show="showErrorAlert"
      >
        {{ errorMessage }}
      </v-alert>
    </div>
  </v-col>  
</v-row>
</template>



<script>
import registrationNewUser from "@/service/register";

export default {
  data: () => ({
    valid: true,
    checkbox: false,
    showPass: false,
    showPassTwo: false,
    showErrorAlert: false,
    errorMessage: "",

    name: "Jo",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 2) || "Name must be that more 1 characters",
    ],

    avatarImg: "",

    email: "koko@abv.bg",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    password: "111111",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length > 5) || "Password must be more than 5 characters",
    ],
    confirmPassword: "111111",
    confirmPasswordRules: [
      (v) => !!v || "Re password is required",
      (v) => (v && v.length > 5) || "Confirmed password must be equal",
    ],
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        //invoke login function

        registrationNewUser(this.email, this.password).then((args) => {
          const [message, name] = args;
          if (message == "success") {
            this.$router.push("/movies"); //redirect to page
            this.$root.$emit("login-user", name);
          } else {
            this.errorMessage = message;
            this.showErrorAlert = true;
            setTimeout(() => (this.showErrorAlert = false), 3000);
          }
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
