import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDg-qc6QBytCB9YHuZzhXZ5PQqqGTRFaZQ",
    authDomain: "puzzlessocial-ba6c5.firebaseapp.com",
    projectId: "puzzlessocial-ba6c5",
    storageBucket: "puzzlessocial-ba6c5.appspot.com",
    messagingSenderId: "1021773790241",
    appId: "1:1021773790241:web:2146a53320257186beb760",
    measurementId: "G-FMGP63Z89Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig); 

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };