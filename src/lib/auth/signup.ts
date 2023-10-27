import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export async function signup(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error: any) {
    console.log(error.message);
  }
}
