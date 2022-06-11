import { db} from '@/service/sdk'      
import { collection, onSnapshot } from "firebase/firestore";
import { ref } from "vue";

export default function useSnapshotRecipes() {
   let getAllRecipes = ref([])
   onSnapshot(collection(db, "recipes"), (doc) => doc.docs.forEach(x => getAllRecipes.value.push(Object.assign({}, { id: x.id }, x.data())))) 
  return  getAllRecipes 
}

