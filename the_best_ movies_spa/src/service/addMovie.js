import { db } from '@/service/sdk';
import { collection, addDoc, Timestamp } from 'firebase/firestore'; 

const addData = async (newMovieObj) => {
  try {
    const docRef = await addDoc(collection(db, "privateMovies"), {
      ...newMovieObj,
      createdAt: Timestamp.now() // add current time created doc
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};

export default addData;
