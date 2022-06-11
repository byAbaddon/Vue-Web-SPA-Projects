<template>
  <footer id="footer" class="mastfoot mt-5 text-center text-light">
    <div class="inner">
      <p>
        Made with <span class="text-danger">&hearts;</span> by
        <router-link to="/category"> <a>Cooking</a>. </router-link>
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>



<style scoped>
.mastfoot {
  position: fixed;
  bottom: 0;
  left: 44%;
  padding: 10px;
  color: rgba(255, 255, 255, 0.5);
  /* width:100%; */
  /* height: 30px; Height of the footer */
  /* background: rgb(20, 20, 20); */
 
}
a {
  color: green;
}
p {
  margin: 0;
}
</style>