function CommentSection({
  rating,
  comment,
  comments,
  handleRatingChange,
  handleCommentChange,
  handleSubmitRating,
}: {
  rating: any;
  comment: any;
  comments: any[];
  handleRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCommentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitRating: () => void;
}) {
  return (
    <div>
      <div>
        <h3>Donner une note et un commentaire</h3>
        <label>
          Note (de 1 à 5):
          <input
            className="mt-10"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
        </label>
        <label>
          Commentaire:
          <textarea
            className="w-full mt-10 px-4 py-2  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6643b5] focus:border-transparent text-black"
            value={comment}
            onChange={handleCommentChange}
          />
        </label>
        <button
          className="w-52 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent bg-[#6643b5] mt-5"
          onClick={handleSubmitRating}
        >
          Soumettre
        </button>
      </div>
      <div>
        <h3>Commentaires</h3>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.comment}</p>
            <p>{comment.rating}</p>
            <p>{comment.userName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
