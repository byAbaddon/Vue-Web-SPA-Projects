import { getAuth, updateProfile } from "firebase/auth"

const updateUserProfile = async (displayName, photoURL) => {
  const auth = getAuth()
  await  updateProfile(auth.currentUser, {
    displayName: displayName,
    photoURL: photoURL
  }).then(() => {
    // Profile updated!
    console.log('Success update profile');
    return 'Success update profile'
  }).catch((error) => {
    return error

  })

}


export default updateUserProfile