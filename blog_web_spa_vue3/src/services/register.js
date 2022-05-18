import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Create new Sing  with (email and pass)  
const registrationNewUser = async(email, password) => createUserWithEmailAndPassword(getAuth(), email, password)
    .then((userCredential) => {
      // Signed in 
      const { uid, email }  = userCredential.user
      console.log('You register was successful', uid, email)
      // console.log('You full data', getAuth().currentUser)
      // localStorage.setItem('auth', JSON.stringify({ uid, email}))
      return 'You register was successful'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error register: ', errorCode, ' - ', errorMessage)
      return error.message
    })


export default registrationNewUser 



// getAuth()
//   .createUser({
//     email: 'user@example.com',
//     emailVerified: false,
//     phoneNumber: '+11234567890',
//     password: 'secretPassword',
//     displayName: 'John Doe',
//     photoURL: 'http://www.example.com/12345678/photo.png',
//     disabled: false,
//   })
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log('Successfully created new user:', userRecord.uid);
//   })
//   .catch((error) => {
//     console.log('Error creating new user:', error);
//   });