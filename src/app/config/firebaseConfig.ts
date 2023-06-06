import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

export const firebaseConfig = {
    apiKey: "AIzaSyDZVHGGd4vanHr1QwCeieOCA5DwQNig80Y",
    authDomain: "notifen-845bf.firebaseapp.com",
    projectId: "notifen-845bf",
    storageBucket: "notifen-845bf.appspot.com",
    messagingSenderId: "343617118341",
    appId: "1:343617118341:web:653547496872a1cb6889ec",
    measurementId: "G-64YFMKPLD5"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);