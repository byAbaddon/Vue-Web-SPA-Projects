import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const singUser = (email, password) => signInWithEmailAndPassword(getAuth(), email, password)
  .then((userCredential) => {
    const { uid, email } = userCredential.user
    const userName = email.split('@')[0]
    console.log(`Success login!\nYou id: ${uid}\nYou email: ${email}`)
    // localStorage.setItem('auth', JSON.stringify(userCredential.user)) //save all user data )
    localStorage.setItem('auth', JSON.stringify({ uid, email, userName }))
    return ['success',userName]
  })
  .catch((error) => {
    // const errorCode = error.code;
    return [error.message]

  });


export default singUser
