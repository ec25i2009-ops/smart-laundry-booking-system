import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function signUp(email, password, name, hostel) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // creates the matching document in your `users` collection
  await setDoc(doc(db, "users", cred.user.uid), { name, email, hostel });
  return cred.user;
}

export async function logIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function logOut() {
  await signOut(auth);
}