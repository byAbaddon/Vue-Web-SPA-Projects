<template>

  <section id="register">
     <h2 class="message"> </h2>
    <div class="color">
        <div class="register-form">
            <h1>Register</h1>
            <form id="form" @submit.prevent="submitRegistration">
                <label for="email">Email</label>
                <input type="text" name="email" placeholder="required">
                <label for="password" >Password</label>
                <input type="password" name="password"  placeholder="6 symbols minlength">
                <label for="repeat-password">Repeat Password</label>
                <input type="password" name="repeatPassword" placeholder="passwords fields must be equal">
                <button id="btnSubmit">Submit</button>              
                <router-link to="/login" class="option">Already have an account?</router-link>
            </form>
        </div>
    </div>
</section>
</template>

<script>
import registrationNewUser from '@/services/register'

export default {
 data:() => ({
 }) ,

   methods:{
     submitRegistration(e){
       const [email, password, repeatPassword] = e.target.querySelectorAll('input')
       
        if(/\w{2,}@\w{2,}\.\w{2,}/.test(email.value) &&  password.value.length > 5 && password.value == repeatPassword.value) {
      
         document.getElementById('btnSubmit').style.color = 'green'
        
         registrationNewUser(email.value, password.value).then( message => {
            document.getElementsByClassName('message')[0].textContent = message

             if (message == 'You register was successful') {
                 setTimeout(() => {
                    e.target.reset()
                    this.$router.push('/login')
                }, 3500);
             } 
              setTimeout(() => {
                    document.getElementById('btnSubmit').style.color = 'white'
                    document.getElementsByClassName('message')[0].textContent = ''
              }, 3000);
         })
        }

      }
    },
}
</script>


<style scoped>

.message{
  position: absolute;
  top: 4em;
  color:gold;
  text-decoration: underline;
}

#register {
  display: flex;
  justify-content: center;
  align-items: center;
   height: 90vh;
  background: url('@/assets/images//laptop.jpg');
  background-size: cover;
  background-position: 100%;
}

.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 60px 30px;
  background: aliceblue;
  /* margin-top: 80px; */
  transition: transform 0.5s;
  border-radius: 5px;
background: linear-gradient(#c83e3e99, #c0d9ff);
}

.register-form label {
  margin: 10px 0;
}

.register-form h1 {
  margin-bottom: 30px;
  font-size: 40px;
  padding: 10px 50px;
}

#register form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#register input[type="text"],
#register input[type="password"] {
  font-size: 18px;
  padding: 11px 20px;
  outline: none;
  border: none;
  background: rgb(230, 230, 230);
  border-radius: 5px;
  width: 300px;
}

#register button {
  font-size: 18px;
  padding: 8px 10px;
  border: none;
  background: cornflowerblue;
  color: #fff;
  margin-top: 30px;
  border: double;
  border-radius: 5px;
}

#register button:hover {
  cursor: pointer;
}

.option {
  align-self: center;
  margin-top: 30px;
  text-decoration: none;
  color: sienna;
}

.color {
  height: 100%;
  width: 100%;
  background: #2121218a;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>