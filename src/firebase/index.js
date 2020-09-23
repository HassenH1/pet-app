//import * as firebase from "firebase";
import app from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCdXhvnHiLh4FatpysN_rh4VF0xvcH5Y-8",
  authDomain: "pet-app-cc5be.firebaseapp.com",
  databaseURL: "https://pet-app-cc5be.firebaseio.com",
  projectId: "pet-app-cc5be",
  storageBucket: "pet-app-cc5be.appspot.com",
  messagingSenderId: "250339180560",
  appId: "1:250339180560:web:4b697baf4152a76be20a95",
  measurementId: "G-DN5TJNDVSV",
};

const firebase = app.initializeApp(firebaseConfig);

export default firebase;
