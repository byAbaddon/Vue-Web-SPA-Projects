<template>
  <div class="not-found">
    <div class="navigate">
      <h1>The Page Not Found!</h1>
      <span type="text">Back to:</span>
      <router-link to="/">
        <input type="button" value="Home page" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.not-found {
  background: url("@/assets/images/notFound/notFoud2.jpg") center no-repeat;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 90vh;
  width: 100%;
}

.navigate{
  float: right;
  margin: auto;
  margin-top: 32em;
  margin-right: 15em;
}

input{
    margin-left: 2em;
  padding: 10px;
  color: antiquewhite;
  background: blueviolet;
  border: 2px solid azure;
  border-radius: 6px;
  font-weight: bold;
}

input:hover{
  color:aqua;
  cursor: pointer;
}

span{
  font-size: large;
  font-weight: bold;
}

</style>