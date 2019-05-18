import {firestoreExport} from 'node-firestore-import-export';
import * as firebase from 'firebase-admin';
 
firebase.initializeApp({
    apiKey: "AIzaSyDu8AG8ZoBeMToQSAbwxkIGMANP8t5RN4o",
    authDomain: "ishanagrolimited.firebaseapp.com",
    databaseURL: "https://ishanagrolimited.firebaseio.com",
    projectId: "ishanagrolimited",
    storageBucket: "",
    messagingSenderId: "12905357107"              
});
 
const collectionRef = firebase.firestore().collection('JournalForm');
 
firestoreExport(collectionRef)
    .then(data=>console.log(data));