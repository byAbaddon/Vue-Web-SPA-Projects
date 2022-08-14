import { db } from '@/service/sdk'
import { doc, updateDoc } from "firebase/firestore";


const editData = async (key, objectData) => {
  const editDone = doc(db, "events", key)
  await updateDoc(editDone, objectData)
  return key
}



export { editData }