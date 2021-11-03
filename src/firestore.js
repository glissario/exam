import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseFirestore = initializeApp({
  apiKey: "AIzaSyAnXzaJXuSvV4CzFJhXqgvlVsZgMlX5J-g",
  authDomain: "exam-prep-125e7.firebaseapp.com",
  projectId: "exam-prep-125e7",
});
const firestoreDB = getFirestore(firebaseFirestore);

export default firestoreDB;
