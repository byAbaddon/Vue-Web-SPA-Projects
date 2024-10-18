//    ----------using   onSnapshot with options-------------

import { db } from '@/service/sdk'
import { collection, query, orderBy, limit, onSnapshot, where, getDocs, startAfter } from "firebase/firestore"


 // Load data form base , options to  using params.
 // @param {Object}     -  options to load: filters, limit and more
 // @param {Function}   -   callback  get data.
// @returns {Function} - function stop watch
 
let allMovies = []

const loadAllMoviesFromBase = (options = {}, callback) => {
  try {
    const getMoviesCollection = collection(db, "privateMovies")
    let movieQuery = query(getMoviesCollection, orderBy('createdAt', 'desc'))

    if (options.limit) {
      movieQuery = query(movieQuery, limit(options.limit))
    }

    if (options.filter) {
      for (const [field, value] of Object.entries(options.filter)) {
        if (field == 'genre') {
          // check list of genres
          const genres = value.split(',').map(g => g.trim());
          movieQuery = query(movieQuery, where(field, 'array-contains-any', genres))
        } else {
          movieQuery = query(movieQuery, where(field, '==', value))
        }
      }
    }

    const unsubscribe = onSnapshot(movieQuery, (querySnapshot) => {
      allMovies = []
      querySnapshot.forEach((doc) => {
        let allData = { id: doc.id, ...doc.data() }
        allMovies.push(allData)
      })
      

      if (callback) {
        callback(allMovies)  // callback new data
      }

      return allMovies
    }, (error) => {
      console.error('Error fetching data:', error)
    })

    return unsubscribe  // stop watch data

  } catch (error) {
    console.error("Error setting up onSnapshot:", error)
    throw error
  }
}




const loadAllMoviesFromBaseOnce = async () => {
  try {
    const movieQuery = query(collection(db, "privateMovies"), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(movieQuery);
    const allMovies = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return allMovies;
  } catch (error) {
    console.error('Error loading movies:', error);
    throw error;
  }
};





export { loadAllMoviesFromBase , loadAllMoviesFromBaseOnce, allMovies}



/*
//    ----------using   onSnapshot-------------

import { db } from '@/service/sdk'
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"

let allMovies = []

const loadAllMoviesFromBase = (callback) => {
  try {
    const getMoviesCollection = collection(db, "privateMovies")
    const sortedMovieCollection = query(getMoviesCollection, orderBy('createdAt', 'desc'), limit(200))

    const unsubscribe = onSnapshot(sortedMovieCollection, (querySnapshot) => {
      allMovies = []
      querySnapshot.forEach((doc) => {
        let allData = { id: doc.id, ...doc.data() }  // Updated to use spread operator
        allMovies.push(allData)
      })

      // console.log('Movies loaded:', allMovies)  // Add logging here
      // get movies with call callback function and stop unsubscribe  
      if (callback) {
        callback(allMovies)
      }
    }, (error) => {
      console.error('Error fetching data:', error)
    })

    return unsubscribe  // Return the unsubscribe function

  } catch (error) {
    console.error("Error setting up onSnapshot:", error)
    throw error
  }
}

export { loadAllMoviesFromBase, allMovies }



*/







/*  -----------  Old using   getDocs----------------
import { db } from '@/service/sdk'
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"

                           
 let allMovies = []

 const loadAllMoviesFromBase = async () => {
  allMovies = []
   try {
    const getMoviesCollection = collection(db, "privateMovies")
    const sortedMovieCollection = query(getMoviesCollection, orderBy('createdAt', 'desc'), limit(200))  //orderBy("title"))
    const querySnapshot = await getDocs(sortedMovieCollection)

    querySnapshot.forEach((doc) => {
      // console.log('test get data: ', doc.id, " => ", doc.data())
      let allData = Object.assign({}, { id: doc.id }, doc.data())
      allMovies.push(allData)
    })

    return allMovies

  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}



export  {loadAllMoviesFromBase , allMovies} 

*/