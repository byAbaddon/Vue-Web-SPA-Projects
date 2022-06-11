import { db } from '@/service/sdk'
import { doc, getDoc } from "firebase/firestore";

async function loadDetails(keyId) {

  const docRef = doc(db, "recipes", keyId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log("Document data details was load successful!")
    return docSnap.data()
  } else {
    console.log("No such document!")
  }

}


export { loadDetails }
