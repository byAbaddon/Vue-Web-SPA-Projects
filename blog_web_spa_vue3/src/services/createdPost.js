import {db} from '@/services/sdk'
import { collection, doc, setDoc } from "firebase/firestore"; 

const addPost = async (post) => {
  const newPostRef = doc(collection(db, "posts"))
  await setDoc(newPostRef, Object.assign({}, { id: newPostRef.id }, post ))
}

 export default addPost


// import {db} from '@/services/sdk'
// import { doc, setDoc } from "firebase/firestore"; 

// const addPost = async (post) => {
//   await setDoc(doc(db, "posts",  post.customId),  post);
// }

// export default addPost




//----------------------------------------------------------------



// import {db} from '@/services/sdk'
// import { collection, addDoc } from "firebase/firestore"; 


// const addPost = async (post) => {

//   try {
//     const docRef = await addDoc(collection(db, "posts"), {
//       ...post  
//     })
//     console.log("Document written with ID: ", docRef.id)
//   } catch (e) {
//     console.error("Error adding document: ", e.error)
//   }

// }


// export default addPost