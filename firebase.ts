import { getApp,getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyAa2i7cYtQ_HZKIfwgvmSDnqPP90QvlfeI",
    authDomain: "reedzdropbox-clone.firebaseapp.com",
    projectId: "reedzdropbox-clone",
    storageBucket: "reedzdropbox-clone.appspot.com",
    messagingSenderId: "203572528521",
    appId: "1:203572528521:web:27d88c8ddf5a4ff92d0d58"
  };

  const app = getApps().length? getApp() : initializeApp(firebaseConfig);
  const db= getFirestore(app);
  const storage= getStorage(app);
  export{db,storage}