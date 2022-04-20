import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


// Create new Sing  with (email and pass)  
const registrationNewUser = async(email, password) => createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      // Signed in 

      const { uid, email }  = userCredential.user
      // console.log('You full data', getAuth().currentUser)
      console.log('You register was successful', uid, email)
      const userName = email.split('@')[0]
      localStorage.setItem('auth', JSON.stringify({ uid, email, userName }))
      return ['success',userName]
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error register: ', errorCode, ' - ', errorMessage)
      return [error.message]
    })


export default registrationNewUser 