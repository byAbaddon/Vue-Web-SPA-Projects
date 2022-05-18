<template>
    <div v-show="showDialog" class="header-modal" @onDialog="odDialog" >
      <!-- Modal content -->
      <div class="modal">
        <div class="buttons">
          <span class="agree" @click="onAgreeDeletePost"> &#x2705;</span>
          <span class="close" @click="onCloseDialog">&#10006;</span>
        </div>
        <p>{{message}}</p>
      </div>
    </div>
</template>

<script>
import deletePost from "@/services/deletePost";
import { getAllPosts, posts } from "@/services/getAllPosts"
import emitter from 'tiny-emitter/instance'

export default {
  data: () => ({
    message: 'Are you sure to want to delete this post?',
    showDialog: false,
    postId: '',

  }),
  methods: {
    onCloseDialog() {
      this.showDialog =  false
    },

    onAgreeDeletePost() {
      deletePost(this.postId)
        .then(e => {
          console.log("Delete Success")
          this.message = "Post was DELETED Success!"
           
          this.$router.push('/posts/delete')

          setTimeout(() => {
            this.$router.back()
            this.showDialog = !this.showDialog
          }, 3000); 
        })
        .catch((error) => console.log(error));
    },
  },

  mounted(){
    emitter.on('on-delete', (currentPostId) => {
         this.postId = currentPostId
         this.showDialog = !this.showDialog
     })
  }
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
  width: 30%; /* Could be more or less, depending on screen size */
  height: 4em;
  background: linear-gradient(rgb(138, 29, 29), blue);
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

.close {
  font-size: 38px;
  color: red;
  position: relative;
  top: 3px;
}

.agree:hover,
.close:hover,
.close:focus {
  text-decoration: none;
  cursor: pointer;
}
</style>