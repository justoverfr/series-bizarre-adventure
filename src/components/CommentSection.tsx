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
