<template>
  <v-row class="register">
    <v-col cols="12">
      <v-container class="">
        <v-row class="justify-center">
             <!-- image -->
          <v-col cols="3" class=" hidden-xs ">   
            <div class="mt-12" >
              <v-img
                src="../assets/images/registerPic.jpeg"
                alt="registerPicture"
                style="background: linear-gradient(red , 0, black)"
                max-height="600"
                max-width="250"
                min-height="520"
              >
              </v-img>
            </div>
          </v-col>

  <v-col cols="" sm="5">
        <!--form  -->
        <div class="d-flex ma-6 mt-12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              append-icon="mdi-account-alert"
              required
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="photoURL"
              label="Avatar image / not required"
              append-icon="mdi-image"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              append-icon="mdi-email-check"
              required
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="Password"
              required
              variant="underlined"
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
              variant="underlined"
              :append-icon="showPassTwo ? 'mdi-eye ' : 'mdi-eye-off'"
              :type="showPassTwo ? 'text' : 'password'"
              @click:append="showPassTwo = !showPassTwo"
            >
            </v-text-field>

            <v-checkbox
              v-model="checkbox"
              :rules= "checkboxRules"
              label="Do you agree?"
              required
            ></v-checkbox>

            <v-btn
              :disabled="
                !checkbox  ||
                name.length < 2 ||
                email.length < 7 ||
                password != confirmPassword
              "
              color="success"
              class="mr-4"
              @click="validate"
            >
              Register
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>

            <v-btn color="primary" @click="$router.push('/')"> Exit </v-btn>
          </v-form>
        </div>
        </v-col>
        </v-row>
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
import registrationNewUser from "@/service/register"
import updateUserProfile from "@/service/updateUserProfile"

export default {
  data: () => ({
    valid: true,
    showPass: false,
    showPassTwo: false,
    showErrorAlert: false,
    errorMessage: "",

    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 2) || "Name must be that more 1 characters",
    ],

    photoURL: "",

    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length > 5) || "Password must be more than 5 chars",
    ],
    confirmPassword: "",
    confirmPasswordRules: [
      (v) => !!v || "Re password is required",
      (v) => (v && v.length > 5) || "Confirmed password must be equal",
    ],
    checkbox: false,
    checkboxRules: [  (v) => !!v || "You must agree for success registration!",]
    
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        //invoke login function

        registrationNewUser(this.email, this.password).then((message) => {
          //new user success register
          updateUserProfile(this.name, this.photoURL); //update profile /add name and photo

          if (message == "success") {
            this.$router.push("/events"); //redirect to page
            this.$root.$emit("user-data", this.name, this.photoURL);
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
  },
};
</script>


<style scoped >
.register{
  margin: -2.5em;
  height: 100%;
  background: linear-gradient( #eb8a8a, #ffffff )
  /* background: white; */
}
</style>