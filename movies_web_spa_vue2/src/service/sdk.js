import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDLLNHDIyaMulTpssOUevsxrXGxCGtSWOU",
  authDomain: "routingbase-21148.firebaseapp.com",
  databaseURL: "https://routingbase-21148-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "routingbase-21148",
  storageBucket: "routingbase-21148.appspot.com",
  messagingSenderId: "471268967740",
  appId: "1:471268967740:web:b446f4ac7de607737d4a39"
}

const firebaseSDK = initializeApp(firebaseConfig)
const db = getFirestore(firebaseSDK)


export { firebaseSDK, db}