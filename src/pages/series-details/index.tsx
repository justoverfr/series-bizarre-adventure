import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SerieHeader from "@/components/SerieHeader";
import fetchSerie from "@/hooks/useSerieData";
import fetchSerieCredits from "@/hooks/getSerieCredits";
import fetchSerieEpisodes from "@/hooks/getSerieEpisodes";
import { checkIfFollowed, toggleFollowStatus } from "@/lib/auth/FollowRequest";
import ActorsList from "@/components/ActorList";
import SeasonList from "@/components/SeasonList";

function SerieDetails() {
  const { id } = useParams();
  const { selectedSerie } = fetchSerie(id!);
  const { serieCredit } = fetchSerieCredits(id!);
  const { seasonEpisodes } = fetchSerieEpisodes(id!);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const userId = "XU5Okh6EiJXR2dkTgO2c";
    checkIfFollowed(userId, id)
      .then((result) => {
        setIsFollowing(result);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur : ",
          error
        );
      });
  });

  const toggleFollowing = async () => {
    const userId = "XU5Okh6EiJXR2dkTgO2c";
    const newFollowStatus = await toggleFollowStatus(userId, id, isFollowing);
    setIsFollowing(newFollowStatus);
  };

  return (
    <>
      <div>
        <SerieHeader selectedSerie={selectedSerie!} />
      </div>
      <div>
        {serieCredit ? (
          <ActorsList actors={serieCredit.cast} />
        ) : (
          <p>Chargement des acteurs en cours...</p>
        )}
      </div>
      <button onClick={toggleFollowing}>
        {isFollowing ? "Ne plus suivre" : "Suivre"}
      </button>
      <SeasonList
        seasons={selectedSerie?.seasons}
        seasonEpisodes={seasonEpisodes}
      />
    </>
  );
}

export default SerieDetails;
