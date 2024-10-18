import { db } from '@/service/sdk'
import { doc, deleteDoc } from "firebase/firestore";

const deleteData = async (key) => {
  await deleteDoc(doc(db, "privateMovies", key));
} 


export default deleteData