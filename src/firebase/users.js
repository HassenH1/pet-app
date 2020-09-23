import firebase from "./index";
import "firebase/auth";
const auth = firebase.auth();

const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const doSignOut = () => auth.signOut();

const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  auth,
  doSignOut,
};
