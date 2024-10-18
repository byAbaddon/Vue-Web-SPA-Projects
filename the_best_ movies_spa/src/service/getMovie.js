import { db } from '@/service/sdk';
import { doc, getDoc } from 'firebase/firestore';

// movies cache
const dataCache = {}

const getDataById = async (id) => {
  // check is movie in cache
  if (dataCache[id])  return dataCache[id]
  

  try {
    const docRef = doc(db, 'privateMovies', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      // save data in cache
      dataCache[id] = data
      return data
    } else {
      console.log('No such document!');
      return null
    }
  } catch (error) {
    console.error('Error getting document:', error)
    return null
  }
}

export default getDataById







