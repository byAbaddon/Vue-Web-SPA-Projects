import { db } from '@/service/sdk'
import { doc, updateDoc, Timestamp } from "firebase/firestore";

const editData = async (key, objectData) => {
  const editDone = doc(db, "privateMovies", key);
  const updatedData = {
    ...objectData,
    createdAt: Timestamp.now()  // update createdAt with newTime
  }

  await updateDoc(editDone, updatedData);
}

export default editData;


/*  No update Time
import { db } from '@/service/sdk'
import { doc, updateDoc } from "firebase/firestore";


const editData = async (key, objectData) => {
  const editDone = doc(db, "privateMovies", key)
  await updateDoc(editDone, objectData)
}


export default editData
*/ 

