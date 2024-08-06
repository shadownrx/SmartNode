import { initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirebase} from "firebase/firestore";

const firebaseConfig ={
    apiKey: "AIzaSyC3CVRSYRVd3E4mslwXjb5JNOHy81R5BPg",
    authDomain: "acrs-4c05c.firebaseapp.com",
    projectId: "acrs-4c05c",
    storageBucket: "acrs-4c05c.appspot.com",
    messagingSenderId: "113251364399",
    appId: "1:113251364399:web:a62f0f63771fdf497460da",
    measurementId: "G-J53CKBB1BH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };