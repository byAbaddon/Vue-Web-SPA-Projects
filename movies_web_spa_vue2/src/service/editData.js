import { db } from '@/service/sdk'
import { doc, updateDoc } from "firebase/firestore";


const editData = async (key, objectData) => {
  const editDone = doc(db, "movies", key)
  await updateDoc(editDone, objectData)
}



export default editData