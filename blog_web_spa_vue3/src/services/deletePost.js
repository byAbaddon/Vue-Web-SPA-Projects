import { db} from '@/services/sdk'     
import { doc, deleteDoc} from "firebase/firestore";

const deletePost = async (id) => {
  console.log(id);
  await deleteDoc(doc(db, "posts", id))
}

export default deletePost