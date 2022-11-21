import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFkWjyMNnw4oF5zsExinvdzyqQVeA4Kfs",
  authDomain: "todo-list-womanup1.firebaseapp.com",
  projectId: "todo-list-womanup1",
  storageBucket: "todo-list-womanup1.appspot.com",
  messagingSenderId: "740638989624",
  appId: "1:740638989624:web:305cc53ebfdcfc7e77f5cd",
};
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
