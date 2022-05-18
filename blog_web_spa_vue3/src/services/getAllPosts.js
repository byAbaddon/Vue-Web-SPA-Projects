import { db} from '@/services/sdk'                
import { collection, getDocs} from "firebase/firestore";  

let posts = []

const getAllPosts = async () => {
  posts = []
  const getPostsCollection = collection(db, "posts")                                   
  const querySnapshot = await getDocs(getPostsCollection)   

    querySnapshot.forEach((doc) => {
      let allData = Object.assign({}, {id: doc.id }, doc.data())
      posts.push(allData)
  })

   return posts
}
 

export  {getAllPosts , posts} 








// import { collection, getDocs } from "firebase/firestore"; 
// import { db} from '@/services/sdk'

// const getAllPosts = async () => {
//   let posts = []
//   const querySnapshot = await getDocs(collection(db, "posts"))
//   querySnapshot.forEach((doc) => {
//     // console.log(`${doc.id} => ${doc.data()}`)
//     posts.push(doc.data())
//   })
//     return posts
// }


// export default getAllPosts