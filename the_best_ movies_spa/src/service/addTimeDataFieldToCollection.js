import { collection, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/service/sdk'


const addCreatedAtToAllDocuments = async () => {
  const moviesCollection = collection(db, "privateMovies");
  const querySnapshot = await getDocs(moviesCollection);

  querySnapshot.forEach(async (docSnapshot) => {
    const docRef = doc(db, "privateMovies", docSnapshot.id);
    await updateDoc(docRef, {
      createdAt: Timestamp.now() // add current time
    });
  });

  console.log('All documents updated with createdAt');
}

export default addCreatedAtToAllDocuments
