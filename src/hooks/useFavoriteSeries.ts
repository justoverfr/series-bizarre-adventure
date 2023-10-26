// favoriteSeriesHook.js

import { useEffect, useState } from "react";
import { db } from "@/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { Series } from "@/types";

const useFavoriteSeries = (userId : any) => {
  const [favoriteSeries, setFavoriteSeries] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState<Series[] | null>(null);

  useEffect(() => {
    const userDocRef = doc(db, "Users", userId);

    getDoc(userDocRef)
      .then((userDoc) => {
        if (userDoc.exists()) {
          const favoriteSeriesIds = userDoc.data().Favorite_id || [];
          setFavoriteSeries(favoriteSeriesIds);

          const fetchSeriesDetails = async () => {
            const details = [];

            for (const seriesId of favoriteSeriesIds) {
              const seriesData = await getSerie(seriesId);
              details.push(seriesData);
            }

            setSeriesDetails(details);
          };

          fetchSeriesDetails();
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur : ",
          error
        );
      });
  }, [userId]);

  const getSerie = async (selectedID : any) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    );
    const json = await response.json();
    return json;
  };

  return { favoriteSeries, seriesDetails };
};

export default useFavoriteSeries;
