<template>
  <main id="main-blog">
    <section class="first-section">
        <section class="background-container">
            <form class="edit-form" @submit.prevent="createdSubmit">
                <h1>Create Post</h1>
                <label for="title">Title</label>
                <input type="text" name="title" placeholder="Required, minlength 2">
                <label for="category">Category</label>
                <input type="text" name="category" placeholder="Required, minlength 2" >
                <label for="content">Content</label>
                <textarea name="content" cols="30" rows="7"  placeholder="Required, maxlength 160"></textarea>
                <button>Create</button>
                <a @click="onBtnExit"><span id="close-btn"  >&#10006;</span></a>
                 
            </form>

            <div class="message"> 
                 <h2>{{message}}</h2>
            </div> 
        </section> 
    </section>
    
</main>
</template>

<script>
import addPost from '@/services/createdPost'

export default {
  

  data: () => ({
   message: ''
  }),

  methods:{
   createdSubmit(e){
    const form = new FormData(e.target)
    const title = form.get('title')
    const category = form.get('category')
    const content = form.get('content')
    const creatorEmail = JSON.parse(localStorage.getItem('auth')).email

     console.log('click error not fill fields');
     this.message = 'The fields are not fill correct!'

    if (title && category && content && (content.length > 2 && content.length <= 160)) {
      console.log('Success add new post', title); 
      this.message = `Success add new post - ${title}.`
      addPost({title,category ,content, creatorEmail})
      e.target.reset()
      setTimeout(() => {
        this.$router.push('/posts')
      }, 1500);
    }
    setTimeout(() => this.message = '' , 2000)
      
   },

    onBtnExit(e){
      this.$router.push('/')
    },

  },

}
</script>


<style scoped >

.message{
  margin-top:10em;
}

.message h2{
  color: cornsilk;
  text-align: center;
  font-size: xx-large;
  text-shadow: 4px 1px blueviolet;
  margin-top: -13em;
}

#main-blog{
  background: url('../assets/images/addPost/add-blog.png');
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
  height: 87vh;
}

.background-container  h1 {
  color: rgb(39, 36, 36);
  font-size: 50px;
}

.background-container a {
  display: inline-block;
  padding: 2px 10px;
  margin: 50px 20px;
  transition: transform 0.3s;
  border:1px solid rgb(233, 6, 6);
  border-radius: 12px;
      /* box-sizing: border-box; */
}
#close-btn {
  font-size: 30px;
  border: none;  
  color: red;
  
}
#close-btn:hover {
  transform: none;
  cursor: pointer;
}


.first-section form,
.edit-posts form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #fff;
  width: 30em;
  padding: 30px;
  margin-top: 90px;
  border-radius: 5px;
}

.edit-posts form {
  margin: 0;
  position: relative;
  height: 90vh;
}

/*title */
.first-section form h1{
  align-self: center;
  font-size: 26px;
  margin: 10px 0 15px;
  border-bottom: 3px dotted darkorchid;
  color: darkorchid;
}

.first-section form input,
.first-section form textarea {
  border: none;
  background: rgb(240, 240, 240);
  font-size: 16px;
  padding: 10px;
  resize: none;
}

.first-section form label,
.edit-posts form label {
  margin: 10px 0;
}


.edit-form {
  position: fixed;
  z-index: 100;
  box-shadow: 1px 1px 5px gray;
  top: 8%;
  animation: appear 1 0.5s;
}

.edit-form a {
  color: black;
  position: absolute;
  top: -36px;
  right: -10px;
}


.edit-posts a:hover {
  transform: none;
}


img {
  width: 25px;
  position: absolute;
  top: 10px;
  right: 25px;
}

button {
  font-size: 18px;
  padding: 8px 10px;
  background: darkorchid;
  color: rgb(241, 241, 241);
  margin-top: 30px;
  border: double;
  border-radius: 5px;
}

button:hover{
  cursor:pointer;
background: darkorchid;
}

</style>
