// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClkioqCyKJTyNJUJjT_5k9RQrZ5qzRGt0",
  authDomain: "crwn-clothing-db-aee70.firebaseapp.com",
  projectId: "crwn-clothing-db-aee70",
  storageBucket: "crwn-clothing-db-aee70.appspot.com",
  messagingSenderId: "346039471264",
  appId: "1:346039471264:web:5154a5e6d9ec5c04bccdc5",
  measurementId: "G-E19ZZGYXYJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShop = await getDoc(userDocRef);

    if(!userSnapShop.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await (setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            }))
        } catch(error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);