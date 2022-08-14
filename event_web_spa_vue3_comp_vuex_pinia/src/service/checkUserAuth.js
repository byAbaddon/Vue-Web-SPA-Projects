// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const getU = 
// onAuthStateChanged(getAuth(), (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
    
//     console.log(user.uid, user.photoURL , user.displayName)
  
//   } else {
//     // User is signed out
//     // ...
    
//   }

  

// })

import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;


  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId)
      console.log("  Provider-specific UID: " + profile.uid)
      console.log("  Name: " + profile.displayName)
      console.log("  Email: " + profile.email)
      console.log("  Photo URL: " + profile.photoURL)
    })
  }
