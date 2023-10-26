import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SerieHeader from "@/components/SerieHeader";
import fetchSerie from "@/hooks/useSerieData";
import fetchSerieCredits from "@/hooks/getSerieCredits";
import fetchSerieEpisodes from "@/hooks/getSerieEpisodes";
import { checkIfFollowed, toggleFollowStatus } from "@/lib/auth/FollowRequest";
import ActorsList from "@/components/ActorList";
import SeasonList from "@/components/SeasonList";
import { db } from "@/config/firebase-config";
import { collection, addDoc } from "firebase/firestore";

function SerieDetails() {
  const { id } = useParams();
  const { selectedSerie } = fetchSerie(id!);
  const { serieCredit } = fetchSerieCredits(id!);
  const { seasonEpisodes } = fetchSerieEpisodes(id!);
  const [isFollowing, setIsFollowing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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

  const handleRatingChange = (event: any) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleSubmitRating = async () => {
    if (rating < 1 || rating > 5) {
      alert("La note doit être comprise entre 1 et 5.");
      return;
    }

    const userId = "XU5Okh6EiJXR2dkTgO2c";
    const serieId = id;
    const ratingData = {
      userId,
      serieId,
      rating,
      comment,
    };
    const ratingsCollection = collection(db, "Ratings");
    await addDoc(ratingsCollection, ratingData);
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
      <div>
        <h3>Donner une note et un commentaire</h3>
        <label>
          Note (de 1 à 5):
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
        </label>
        <label>
          Commentaire:
          <textarea value={comment} onChange={handleCommentChange} />
        </label>
        <button onClick={handleSubmitRating}>Soumettre</button>
      </div>
      <SeasonList
        seasons={selectedSerie?.seasons}
        seasonEpisodes={seasonEpisodes}
      />
    </>
  );
}

export default SerieDetails;
