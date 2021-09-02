import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6aiT3JbciUVssW7y_L2aq7McRsM2nl-4",
  authDomain: "sahu-187009.firebaseapp.com",
  projectId: "sahu-187009",
  storageBucket: "sahu-187009.appspot.com",
  messagingSenderId: "672835656607",
  appId: "1:672835656607:web:88e4ef7104ac0afe10bbaa"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage, auth };