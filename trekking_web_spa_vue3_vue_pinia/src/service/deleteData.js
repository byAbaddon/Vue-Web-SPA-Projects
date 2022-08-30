import { db } from '@/service/sdk'
import { doc, deleteDoc } from "firebase/firestore";

const deleteData = async (key) => {
  await deleteDoc(doc(db, "treks", key));
} 


export { deleteData }