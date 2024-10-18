import { db } from '@/service/sdk'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";


const updateGenresToArray = async () => {
  try {
    const moviesCollection = collection(db, "privateMovies");
    const querySnapshot = await getDocs(moviesCollection);

    for (const docSnapshot of querySnapshot.docs) {
      const movieData = docSnapshot.data();
      const movieId = docSnapshot.id;

      // check is field is string
      if (typeof movieData.genre === 'string' ) { // for test && movieId == '412mgHuK7I8JDx1q9DhB'
        // transform field to array
        const genresArray = movieData.genre.split(',').map(g => g.trim());

        // update all fields `genre` to array
        await updateDoc(doc(db, "privateMovies", movieId), {
          genre: genresArray
        });

        console.log(`Updated movie ${movieId}:`, genresArray);
      }
    }
  } catch (error) {
    console.error("Error updating genres:", error);
  }
};


export default  updateGenresToArray
