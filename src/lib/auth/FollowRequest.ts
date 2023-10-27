import {
    updateDoc,
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
  } from "firebase/firestore";
  import { db } from "@/config/firebase-config";
  
  export const checkIfFollowed = async (userId: string, serieId: any) => {
    const userDocRef = doc(db, "Users", userId);
    const userDoc = await getDoc(userDocRef);
  
    if (userDoc.exists()) {
      const favorites = userDoc.data().Favorite_id;
      return favorites.includes(serieId);
    }
  
    return false;
  };
  
  export const toggleFollowStatus = async (userId: string, serieId: any, isFollowing: any) => {
    const userDocRef = doc(db, "Users", userId);
  
    try {
      if (isFollowing) {
        await updateDoc(userDocRef, {
          Favorite_id: arrayRemove(serieId),
        });
      } else {
        await updateDoc(userDocRef, {
          Favorite_id: arrayUnion(serieId),
        });
      }
  
      return !isFollowing;
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données : ", error);
      return isFollowing;
    }
  };
  