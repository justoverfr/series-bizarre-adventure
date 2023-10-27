import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export async function signup(
  username: string,
  email: string,
  password: string
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then((data) => {
      //Once the user creation has happened successfully, we can add the currentUser into firestore
      //with the appropriate details.

      const uid = data.user.uid;
      const usersCollection = collection(db, `Users/${uid}`);
      addDoc(usersCollection, {
        id: uid,
        username,
        notifications: true,
        notifications_rate: 24,
        favorites: [],
      })
        //ensure we catch any errors at this stage to advise us if something does go wrong
        .catch((error) => {
          console.log(
            "Something went wrong with added user to firestore: ",
            error.message
          );
          throw error;
        });
    });
    // return true;
  } catch (error: any) {
    console.log(error.message);
    // return null;
  }
}
