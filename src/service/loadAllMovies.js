import { collection, getDocs } from 'firebase/firestore';
import { db} from '../service/sdk'

 let movies = []

const getAllMoviesFromBase = async () => {
  movies = []
  const querySnapshot = await getDocs(collection(db, "movies"))
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    let allData = Object.assign({}, { id: doc.id }, doc.data())
    // const { id, title, imageUrl, genres, rating, tickets, description } = allData 
    // console.log(id, title, imageUrl, genres, rating, tickets, description );
    movies.push(allData)   
  })
  
   return movies
}
 

export default getAllMoviesFromBase