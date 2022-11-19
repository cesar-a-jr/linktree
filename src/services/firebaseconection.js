import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCvU7G7VCOD5-flgD-Pu788DKWhOecQ5AI",
  authDomain: "linktree-ce96b.firebaseapp.com",
  projectId: "linktree-ce96b",
  storageBucket: "linktree-ce96b.appspot.com",
  messagingSenderId: "361952134976",
  appId: "1:361952134976:web:26114f9d9833af10e29ca5"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)


export {db, auth};