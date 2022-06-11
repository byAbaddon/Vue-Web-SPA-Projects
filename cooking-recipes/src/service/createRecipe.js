import {db} from '@/service/sdk'
import { collection, doc, setDoc } from "firebase/firestore"; 

const addRecipe = async (recipe) => {
  const newRecipeRef = doc(collection(db, "recipes"))
  await setDoc(newRecipeRef, Object.assign({}, { id: newRecipeRef.id }, recipe ))
}

export default addRecipe 