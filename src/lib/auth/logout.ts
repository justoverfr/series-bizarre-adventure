import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase-config";

export async function logout() {
  try {
    await signOut(auth);
    console.log("Utilisateur déconnecté");
  } catch (error: any) {
    console.log(error.message);
  }
}
