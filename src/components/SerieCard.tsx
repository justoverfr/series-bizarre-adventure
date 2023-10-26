import { Series } from "@/types";
import { Link } from "react-router-dom";

const SerieCard = ({ series }: { series: Series }) => {
  return (
    <div>
      <Link to={`/series/${series.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
        />
        <p>{series.name}</p>
        <p>{series.vote_average}</p>
      </Link>
    </div>
  );
};

export default SerieCard;
