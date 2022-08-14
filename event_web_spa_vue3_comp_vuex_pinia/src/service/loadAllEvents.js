import { db} from '@/service/sdk'
import { collection, getDocs, query, orderBy } from "firebase/firestore";  

                           
let events = []

const loadAllEvents = async () => {
  events = []
  const getMoviesCollection = collection(db, "events")                                     
  const sortedMovieCollection = query( getMoviesCollection, orderBy("people", ))  //'desc    
  const querySnapshot = await getDocs(sortedMovieCollection)   

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      let allData = Object.assign({}, { id: doc.id }, doc.data())
      // const { id, title, imageUrl, genres, rating, tickets, description } = allData 
      // console.log(id, title, imageUrl, genres, rating, tickets, description );
      events.push(allData)
    
  })

   return events
}
 

export  {loadAllEvents, events } 