import {getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginUser = (email, password) => signInWithEmailAndPassword(getAuth(), email, password)
  .then((userCredential) => {
    const { uid, email,} = userCredential.user

    console.log(`Success login!\nYou id: ${uid}\nYou email: ${email}`)
    // localStorage.setItem('auth', JSON.stringify(userCredential.user)) //save all user data )
    let userName = email.split('@')[0]
    userName = userName.charAt(0).toUpperCase() + userName.slice(1)
    localStorage.setItem('auth', JSON.stringify({ uid, email, userName}))
    return 'Success'
  })
  .catch((error) => {
    // const errorCode = error.code;
    return error.message

  });


export default loginUser
