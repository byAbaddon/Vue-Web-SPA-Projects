import { defineStore } from 'pinia'
import { saveDataToLocalStorage, getDataFromLocalStorage } from '@/storage/localeStorage'
import { loadAllMoviesFromBase} from '@/service/loadAllMovies'
import deleteData from '@/service/deleteMovie'
import editData from '@/service/editMovie'
import addData from '@/service/addMovie'
import getDataById from '@/service/getMovie'
import singUser from '@/service/login'
import { ref } from 'vue'

export const useMoviesStore = defineStore('movies', () => {
  const isFirstTimeLoadMovies = ref(true)
  const isAdminLogin = ref(false)
  const movies = ref([])
  let unsubscribe = null
  

  const loadMoviesFromStore = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (unsubscribe) unsubscribe();  // stop watching if work
      
      unsubscribe = loadAllMoviesFromBase(options, (loadedMovies) => {
        movies.value = loadedMovies  // update data
        
        resolve(loadedMovies);  // return promise
      })
    })
  }


  // stop watching for update movies base
  const stopBaseListening = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }


  const addMovie = async (movie) => {
    try {
      await addData(movie)
      // await loadMoviesFromStore() // Reload movies to include the newly added movie
    } catch (error) {
      console.error('Failed to add movie:', error)
    }
  }

  const deleteMovie = async (movieId) => {
    try {
      await deleteData(movieId)
      await loadMoviesFromStore() // Reload movies to exclude the deleted movie
    } catch (error) {
      console.error('Failed to delete movie:', error)
    }
  }

  const editMovie = async (movieId, updatedData) => {
    try {
      await editData(movieId, updatedData)
      // await loadMoviesFromStore() // Reload movies to include the updated movie
    } catch (error) {
      console.error('Failed to edit movie:', error)
    }
  }

  const getMovieById = async (movieId) => {
    try {
      const movie = await getDataById(movieId)
      return movie
    } catch (error) {
      console.error('Failed to get movie by ID:', error)
    }
  }

  const loginUser = async (email, pass) => {
    try {
      const user = await singUser(email, pass)
      isAdminLogin.value = user == 'success' ? true : false
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  const saveMoviesToLocalStorage = () => {
    try {
      saveDataToLocalStorage('dataMovies', movies.value)
      console.log('Success add data to localStorage')
    } catch (error) {
      console.log('Failed to save data to storage', error)
    }
  }

  const getMoviesFromLocalStorage = () => {
    try {
      const storedMovies = getDataFromLocalStorage('dataMovies')
      if (storedMovies) {
        movies.value = storedMovies
      }
    } catch (error) {
      console.log('Failed to get data from storage', error)
    }
  }

 

  return {
    isFirstTimeLoadMovies,
    isAdminLogin,
    movies,
    loadMoviesFromStore,
    stopBaseListening,
    addMovie,
    deleteMovie,
    editMovie,
    getMovieById,
    loginUser,
    getMoviesFromLocalStorage,
    saveMoviesToLocalStorage,
  }
})
