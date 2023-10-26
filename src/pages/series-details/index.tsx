import { useParams } from "react-router-dom";
import { db } from "@/config/firebase-config";
import {
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
} from "firebase/firestore";

import SerieHeader from "@/components/SerieHeader";
import fetchSerie from "@/hooks/useSerieData";
import fetchSerieCredits from "@/hooks/getSerieCredits";
import fetchSerieEpisodes from "@/hooks/getSerieEpisodes";
import { useEffect, useState } from "react";

function SerieDetails() {
  const { id } = useParams();
  const { selectedSerie } = fetchSerie(id!);
  const { serieCredit } = fetchSerieCredits(id!);
  const { seasonEpisodes } = fetchSerieEpisodes(id!);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const userDocRef = doc(db, "Users", "XU5Okh6EiJXR2dkTgO2c");
    getDoc(userDocRef)
      .then((userDoc) => {
        if (userDoc.exists()) {
          const favorites = userDoc.data().Favorite_id;
          if (favorites.includes(id)) {
            setIsFollowing(true);
          }
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur : ",
          error
        );
      });
  }, [id]);

  const toggleFollowing = async () => {
    const userDocRef = doc(db, "Users", "XU5Okh6EiJXR2dkTgO2c");

    try {
      if (isFollowing) {
        await updateDoc(userDocRef, {
          Favorite_id: arrayRemove(id),
        });
      } else {
        await updateDoc(userDocRef, {
          Favorite_id: arrayUnion(id),
        });
      }

      setIsFollowing(!isFollowing);
      console.log("Données mises à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des données : ", error);
    }
  };

  return (
    <>
      <div>
        <SerieHeader selectedSerie={selectedSerie!} serieCredit={serieCredit} />
      </div>
      <div>
        Acteurs :{" "}
        {serieCredit
          ? serieCredit.cast
              .filter((actor: any) => actor.known_for_department === "Acting")
              .map((actor: any) => actor.name)
              .join(", ")
          : "Chargement des acteurs en cours..."}
      </div>
      <button onClick={toggleFollowing}>
        {isFollowing ? "Ne plus suivre" : "Suivre"}
      </button>
      <div>
        Saisons :
        <ul>
          {selectedSerie?.seasons?.map((season: any, index: any) => (
            <li key={index}>
              <p>{season.name}</p>
              {seasonEpisodes[season.season_number] && (
                <ul>
                  {seasonEpisodes[season.season_number].map(
                    (episode: any, episodeIndex: number) => (
                      <div key={episodeIndex}>
                        <p>
                          Épisode {episode.episode_number}: {episode.name}
                        </p>
                        <p>Description : {episode.overview}</p>
                        <p>date : {episode.air_date}</p>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                          alt={episode.name}
                        />
                      </div>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SerieDetails;
