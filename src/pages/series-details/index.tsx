import { useParams } from "react-router-dom";
import { RefObject, useEffect, useRef, useState } from "react";
import SerieHeader from "@/components/SerieHeader";
import fetchSerie from "@/hooks/useSerieData";
import fetchSerieCredits from "@/hooks/getSerieCredits";
import fetchSerieEpisodes from "@/hooks/getSerieEpisodes";
import { checkIfFollowed, toggleFollowStatus } from "@/lib/auth/FollowRequest";
import ActorsList from "@/components/ActorList";
import SeasonList from "@/components/SeasonList";
import { db } from "@/config/firebase-config";
import { Comment } from "@/types/Comment";
import CommentSection from "@/components/CommentSection";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

function SerieDetails() {
  const { id } = useParams();
  const { selectedSerie } = fetchSerie(id!);
  const { serieCredit } = fetchSerieCredits(id!);
  const { seasonEpisodes } = fetchSerieEpisodes(id!);
  const [isFollowing, setIsFollowing] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState<Comment>();
  const [comments, setComments] = useState<Comment[]>([]);
  const scrollRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const userId = "BHCtQN4EX8M9f9baa4MPOkld6iG3";
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
    const userId = "BHCtQN4EX8M9f9baa4MPOkld6iG3";
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

    const userId = "BHCtQN4EX8M9f9baa4MPOkld6iG3";
    const serieId = id;

    const userRef = doc(db, "Users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userName = userDoc.data().name;

      const ratingData = {
        userId,
        serieId,
        rating,
        comment,
        userName,
      };

      const ratingsCollection = collection(db, "Ratings");
      await addDoc(ratingsCollection, ratingData);
    }
  };

  const handleScrollToComments = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchComments = async () => {
    const serieId = id;
    const commentsCollection = collection(db, "Ratings");

    const commentsQuery = query(
      commentsCollection,
      where("serieId", "==", serieId)
    );
    const commentSnapshots = await getDocs(commentsQuery);

    const commentsData: any[] = [];
    commentSnapshots.forEach((doc) => {
      commentsData.push(doc.data());
    });

    setComments(commentsData);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

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
      <button
        className="w-52 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent bg-[#6643b5] mt-10"
        onClick={toggleFollowing}
      >
        {isFollowing ? "Ne plus suivre 😕" : "Suivre 🤩"}
      </button>
      <button
        className="w-1/6 px-4 py-2 ml-5 border border-gray-300 rounded-md focus:outline-none focus:border-transparent bg-[#6643b5]"
        onClick={handleScrollToComments}
      >
        <p>Accéder aux commentaires 👇</p>
      </button>
      <SeasonList
        seasons={selectedSerie?.seasons}
        seasonEpisodes={seasonEpisodes}
      />
      <div ref={scrollRef}>
        <CommentSection
          rating={rating}
          comment={comment}
          comments={comments}
          handleRatingChange={handleRatingChange}
          handleCommentChange={handleCommentChange}
          handleSubmitRating={handleSubmitRating}
        />
      </div>
    </>
  );
}

export default SerieDetails;
