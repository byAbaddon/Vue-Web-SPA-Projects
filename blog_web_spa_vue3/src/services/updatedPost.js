import { db } from '@/services/sdk'    
import { doc, updateDoc } from "firebase/firestore";


const editPost = async (key, objectData) => {
  const editDone = doc(db, "posts", key)
  await updateDoc(editDone, objectData)
}




export default editPost