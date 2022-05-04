import { db} from '../service/sdk'
import { collection, getDocs, query, orderBy } from "firebase/firestore";  

                           
 let movies = []

const getAllMoviesFromBase = async () => {
  movies = []
  const getMoviesCollection = collection(db, "movies")                                     
  const sortedMovieCollection = query( getMoviesCollection, orderBy("tickets", ))  //'desc    
  const querySnapshot = await getDocs(sortedMovieCollection)   

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      let allData = Object.assign({}, { id: doc.id }, doc.data())
      // const { id, title, imageUrl, genres, rating, tickets, description } = allData 
      // console.log(id, title, imageUrl, genres, rating, tickets, description );
      movies.push(allData)
    
  })

   return movies
}
 

export  {getAllMoviesFromBase , movies} 