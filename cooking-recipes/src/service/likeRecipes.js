import { db } from '@/service/sdk'
import { doc, updateDoc, arrayUnion} from "firebase/firestore";


const updateRecipeLike = async (key, objectData, owner) => {
  const editDone = doc(db, "recipes", key)
  await updateDoc(editDone, objectData , )
  await updateDoc(editDone, { 'voters': arrayUnion(owner) })
}


export default updateRecipeLike

