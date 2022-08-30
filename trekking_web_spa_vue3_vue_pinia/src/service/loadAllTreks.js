import { db} from '@/service/sdk'
import { collection, getDocs, query, orderBy } from "firebase/firestore";  

                           
let treks = []

const loadAllTreks = async () => {
  treks = []
  const getCollection = collection(db, "treks")                                     
  const sortedCollection = query( getCollection, orderBy("likes", 'desc' ))  //'desc    
  const querySnapshot = await getDocs(sortedCollection)   

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      let allData = Object.assign({}, { 'organizer': doc.id }, doc.data())
      // const { id, title, imageUrl, genres, rating, tickets, description } = allData 
      // console.log(id, title, imageUrl, genres, rating, tickets, description );
      treks.push(allData)
    
  })

   return treks
}
 

export { loadAllTreks, treks }