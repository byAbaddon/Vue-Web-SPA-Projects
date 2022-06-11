import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import router from "@/router"

// Create new Sing  with (email and pass)  
const registrationNewUser = ({ firstName, email, password }) => createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      // Signed in 

      const { uid, email }  = userCredential.user
      // console.log('You full data', getAuth().currentUser)
      console.log('You register was successful', uid, email)
      localStorage.setItem('auth', JSON.stringify(userCredential.user)) //save user data )

      updateUserData(firstName)
      router.push('/login') //redirect to page
      return 'ok'   
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error register: ', errorCode, ' - ', errorMessage)
      return error.message
    })


//updateProfileData
function updateUserData(firstName) {
  const auth = getAuth()
  updateProfile(auth.currentUser, {
    displayName: firstName, photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    console.log(firstName, 'Profile updated!');
  }).catch((e) => {
    console.log('Fail updated profile: ',  e.error)
    // An error occurred
    // ...
  })

}



export { registrationNewUser}