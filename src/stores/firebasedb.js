// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7vGO5IYFQ5YW-pr8WlxqqPtgdaRGVheo",
    authDomain: "amaurot-garden.firebaseapp.com",
    databaseURL: "https://amaurot-garden-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "amaurot-garden",
    storageBucket: "amaurot-garden.appspot.com",
    messagingSenderId: "22584937463",
    appId: "1:22584937463:web:011b21a6039db567f8fcf2",
    measurementId: "G-W6MVWZDB2H"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


export { app, analytics, database };