import { getAuth } from "firebase/auth";


const getUserProfileData = async () => {

  const auth = getAuth()
  const user = await auth.currentUser

  if (user !== null) {
       console.log('getData: ' , user.displayName, user.photoURL )
       return [user.displayName, user.photoURL]
   }
    
  
}


export default getUserProfileData