import { db } from '@/service/sdk'
import { collection, addDoc } from "firebase/firestore"; 

const addData = async (newTrekObj) => {

  try {
    const docRef = await addDoc(collection(db, "treks"), {
      ...newTrekObj
    })
    console.log("Document written with Success by ID: ", docRef.id)
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e.message)
    return e.message
  }

}


export { addData }