import firebase from "firebase";
import { auth } from "firebase";

const FirebaseConfiguration = {
    apiKey: "AIzaSyCeVZ0rXxY1ZVX_6O3N9UkxBByQXnNKWMo",
    authDomain: "naqel-transport-jobs.firebaseapp.com",
    databaseURL: "https://naqel-transport-jobs.firebaseio.com",
    projectId: "naqel-transport-jobs",
    storageBucket: "naqel-transport-jobs.appspot.com",
    messagingSenderId: "331974863267",
    appId: "1:331974863267:web:9a8f80195b8bc8e9b5d216",
    measurementId: "G-Q3X399QB20"
};

const firebaseApp = firebase.initializeApp(FirebaseConfiguration);

export default firebaseApp;