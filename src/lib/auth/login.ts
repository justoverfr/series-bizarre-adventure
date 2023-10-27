import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export async function login(email: string, password: string) {
  try {
    const loginData = await signInWithEmailAndPassword(auth, email, password);
    const user = loginData.user;
    console.log(user);
    return user;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
