import { db } from '@/service/sdk'
import { doc, setDoc } from "firebase/firestore"; 

 const updateData = async (key, objectData) => {
   await setDoc(doc(db, "movies", key), objectData)
 }


export default updateData