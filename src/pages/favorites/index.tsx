import SerieCard from "@/components/SerieCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Series } from "@/types";
import { db } from "@/config/firebase-config";

function FavoriteSeriesList() {
  const [userId, setUserId] = useState("");
  const [favoriteSeries, setFavoriteSeries] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState<Series[] | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (userId) {
      const userDocRef = doc(db, "Users", userId);

      getDoc(userDocRef)
        .then((userDoc) => {
          if (userDoc.exists()) {
            const favoriteSeriesIds = userDoc.data().Favorite_id || [];
            setFavoriteSeries(favoriteSeriesIds);

            const fetchSeriesDetails = async (favoriteSeriesIds) => {
              const details = [];

              for (const seriesId of favoriteSeriesIds) {
                const seriesData = await getSerie(seriesId);
                details.push(seriesData);
              }

              setSeriesDetails(details);
            };

            fetchSeriesDetails(favoriteSeriesIds);
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur : ",
            error
          );
        });
    }
  }, [userId]);

  const getSerie = async (selectedID) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    );
    const json = await response.json();
    return json;
  };

  return (
    <div>
      <h3 className="font-bold text-[40px]">Vidéos Favorites</h3>
      <div className="grid grid-cols-5 gap-4 p-4">
        {seriesDetails ? (
          seriesDetails.map((series, index) => (
            <div key={index}>
              <SerieCard series={series} />
            </div>
          ))
        ) : (
          <p>Chargement des séries en cours...</p>
        )}
      </div>
    </div>
  );
}

export default FavoriteSeriesList;
