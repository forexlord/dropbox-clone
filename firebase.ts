import { getApp,getApps,initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
   //your firebase config
  };

  const app = getApps().length? getApp() : initializeApp(firebaseConfig);
  const db= getFirestore(app);
  const storage= getStorage(app);
  export{db,storage}
