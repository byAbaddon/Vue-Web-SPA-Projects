<template>
  <div v-show="showDialog" class="header-modal" @onDialog="odDialog">
    <!-- Modal content -->

    <div class="modal">
      <div class="buttons">
        <span class="close" @click="onCloseDialog">&#10006;</span>
      </div>
      <section>
        <div><span>Title:</span> {{ postData.title }}</div>
        <div><span>Category:</span> {{ postData.category }}</div>

        <div><span>Content:</span> {{ postData.content }}</div>
      </section>

      <!-- <details-dialog /> -->
    </div>
  </div>
</template>

<script>
import emitter from "tiny-emitter/instance";

export default {
  props: ["allPosts"],

  data: () => ({
    postData: "",
    showDialog: false,
  }),
  methods: {
    onCloseDialog() {
      this.showDialog = false;
    },
  },

  mounted() {
    emitter.on("on-details", (currentPostId) => {
      this.showDialog = !this.showDialog;
      this.postData = this.allPosts.filter((x) => x.id == currentPostId)[0];

      //  const {title, category ,content}  =
      //  console.log(title, category ,content);
    });
  },
};
</script>

<style scoped>
.header-modal {
  /* The Modal (background) */

  /* display: none;  Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal {
  display: block;
  color: aliceblue;
  font-weight: bold;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  border-radius: 12px;
  width: 34%;
  height: 12em;
  background: linear-gradient(rgb(71, 57, 136), #131313);
  /* background: linear-gradient(rgb(138, 29, 29), blue); */
}

.modal div {
  margin: 1em auto;
  color: khaki;
}

.modal span {
  margin-right: 4px;
  color: #8ce7f0;
}

/* The Close Button */

.buttons {
  float: right;
}

.agree {
  font-size: 30px;
  margin-right: 20px;
  margin-bottom: 2px;
}

span.close:nth-child(1) {
  font-size: 36px;
  color: red;
  position: relative;
  top: -0.5em;
}

.agree:hover,
.close:hover,
.close:focus {
  text-decoration: none;
  cursor: pointer;
}
</style>