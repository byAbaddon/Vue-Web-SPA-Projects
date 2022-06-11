import { db } from '@/service/sdk'
import { doc, deleteDoc } from "firebase/firestore";

const deleteRecipe = async (id) => {
  await deleteDoc(doc(db, "recipes", id))
}


export default  deleteRecipe 