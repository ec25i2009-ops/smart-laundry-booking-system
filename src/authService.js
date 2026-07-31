import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export function getCurrentUser() {
  return auth.currentUser;
}

export async function getCurrentUserData() {
  const user = auth.currentUser;

  if (!user) return null;

  const docRef = doc(db, "users", user.uid);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
}

export async function getUserHostel() {
  const data = await getCurrentUserData();

  return data?.hostel;
}

export async function getUserName() {
  const data = await getCurrentUserData();

  return data?.name;
}