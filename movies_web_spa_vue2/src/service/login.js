import {getAuth, signInWithEmailAndPassword } from "firebase/auth";

const singUser = (email, password) => signInWithEmailAndPassword(getAuth(), email, password)
  .then((userCredential) => {
    const { uid, email, displayName, photoURL } = userCredential.user

    console.log(`Success login!\nYou id: ${uid}\nYou email: ${email}`)
    // localStorage.setItem('auth', JSON.stringify(userCredential.user)) //save all user data )

    localStorage.setItem('auth', JSON.stringify({ uid, email, displayName, photoURL}))
    return 'success'
  })
  .catch((error) => {
    // const errorCode = error.code;
    return [error.message]

  });


export default singUser
