import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export async function login(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error: any) {
    console.log(error.message);
  }
}
