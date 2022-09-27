import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyANa68VbPLSMawwWLtl9TQhnIZJoYchnaA",

  authDomain: "ig-clone-training.firebaseapp.com",

  projectId: "ig-clone-training",

  storageBucket: "ig-clone-training.appspot.com",

  messagingSenderId: "428133798947",

  appId: "1:428133798947:web:132bec0163a0d1e0340d96",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
