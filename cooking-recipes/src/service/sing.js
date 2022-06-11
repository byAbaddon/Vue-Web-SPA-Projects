import router from "@/router"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const singUser = (email, password) => signInWithEmailAndPassword(getAuth(), email, password)
  
  .then((userCredential) => {
    const { uid, email, displayName } = userCredential.user

    console.log(`Success login!\nYou name: ${displayName}\nYou id: ${uid}\nYou email: ${email}`)
    localStorage.setItem('auth', JSON.stringify({ uid, displayName, email })) //save user data )
    router.push('/') //redirect to page
    return 'ok'
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(error, ' - ', errorMessage);
    return errorMessage
  });


export {singUser}