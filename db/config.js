import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDo5Qa2JCsJKA89f_Yya0J9PxC0v3k7zRI",
  authDomain: "finetekfonts.firebaseapp.com",
  projectId: "finetekfonts",
  storageBucket: "finetekfonts.appspot.com",
  messagingSenderId: "1085643349723",
  appId: "1:1085643349723:web:4eed91ccc8290b5f25b6fe"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app)

export { db, storage, auth }