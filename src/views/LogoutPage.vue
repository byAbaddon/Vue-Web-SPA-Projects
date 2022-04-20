<template>

  <v-container >
    <v-img src="../assets/images/background/logout.jpeg"></v-img>

    <div class="d-flex justify-center mt-5 my-0 py-0">
      <v-btn @click="back" class="warning ml-6 mr-12 px-6">Back</v-btn>
      <v-btn @click="logout" class="error ml-12">Logout</v-btn>
    </div>
  </v-container>

</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },

    logout() {
      console.log('Custom event' , 'Logout success! All data was deleted, and redirect to HomePage');
      localStorage.removeItem("auth")
      this.$router.push('/')
      this.$root.$emit('logout')
    },
  },
};
</script>

