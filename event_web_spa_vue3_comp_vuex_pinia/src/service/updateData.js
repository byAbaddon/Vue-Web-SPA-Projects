import { db } from '@/service/sdk'
import { doc, setDoc } from "firebase/firestore"; 

 const updateData = async (key, objectData) => {
   await setDoc(doc(db, "events", key), objectData)
 }


export { updateData }