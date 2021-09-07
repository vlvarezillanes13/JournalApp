import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyClVN3v_JfEfN_YOnbhzRVHKfinvj2gRMs",
    authDomain: "react-app-journel.firebaseapp.com",
    projectId: "react-app-journel",
    storageBucket: "react-app-journel.appspot.com",
    messagingSenderId: "462421172073",
    appId: "1:462421172073:web:455344205dc0cbaa0127f8"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export{
    db,
    googleAuthProvider,
    firebase
}