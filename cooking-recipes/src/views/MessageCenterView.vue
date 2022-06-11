<template>
  <section>
    <h1>MESSAGE CENTER</h1>
    <div class="image">
      <img src="@/assets/images/background/1.png" width="800" alt="pic" />
    </div>
    <div class="message">
      <h3>{{message}}</h3>
      <h3 class="error">{{errorMessage}}</h3>
      <h5 v-show="showRedirect">Redirect...</h5>
    </div>
  </section>
</template>

<script>
import router from '@/router'
import {useRoute} from "vue-router";
import { ref, onUnmounted, onMounted} from "vue";

export default {
  setup() {
 
    let message = ref('')
    let showRedirect = ref(false)
    let pathFrom = useRoute().query.from
    let errorMessage =  ref(useRoute().query.error)
  
    switch (pathFrom) {
      case 'share': message.value = 'Success add new recipe!'; break
      case 'archive': message.value = 'This recipe was deleted success!'; break
      case 'edit': message.value = 'Edit recipe was success!'; break  
      case 'regFail': message.value = 'Fail to register!'; break  
      case 'loginFail': message.value = 'Fail to login!'; break  
      case 'makeLike': message.value = 'Thank you for like!'; break  
      case 'alreadyLike': errorMessage.value = 'You already making vote in this recipe!'; break  
    }

    setTimeout(() => { showRedirect.value = true }, 2000);
     
    setTimeout(() => {
       router.push('/category')
    }, 3000);

    onMounted(() => {
      document.querySelector('body').style.background = 'black' 
      document.querySelector('header').style.display = 'none' 
      document.querySelector('footer').style.display = 'none' 
     })


    onUnmounted(() => {
      document.querySelector('body').style = "background : url('../assets/image/background.jpg')"
      document.querySelector('header').style.display = 'block' 
      document.querySelector('footer').style.display = 'block' 
    })

     return {message,showRedirect, errorMessage}
  }
}
</script>

<style scoped>


h1 {
  font-weight: bold;
  text-align: center;
  color: white;
  margin: 1em 0 0.5em 0;
}

.image {
  text-align: center;
}

.image img {
  height: 30em;
  width: 80em;
}

.message{
  margin: 5em auto;
 
}

h3{
  color:aqua;
  text-align: center;
}
.error{
  color:red;
}

h5{
  text-align: center;
  color:yellow;
}

</style>