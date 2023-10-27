import { initializeApp } from "firebase/app";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7gVga8Ov7YOpREkpaNnw--2eB6qAb3Eg",
  authDomain: "serie-s-bizarre-adventure.firebaseapp.com",
  databaseURL:
    "https://serie-s-bizarre-adventure-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "serie-s-bizarre-adventure",
  storageBucket: "serie-s-bizarre-adventure.appspot.com",
  messagingSenderId: "447269592768",
  appId: "1:447269592768:web:df3e8996076b0818c49725",
  measurementId: "G-FNQBCMY9D0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new EmailAuthProvider();
export const db = getFirestore(app);