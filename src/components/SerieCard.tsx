import { Series } from "@/types";
import { Link } from "react-router-dom";

const SerieCard = ({ series }: { series: Series }) => {
  return (
    <div>
      <Link to={`/series/${series.id}`}>
        <div className="flex flex-col items-center">
          <img
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt={series.name}
          />
          <p className="font-bold text-[20px]">{series.name}</p>
          <p>⭐{series.vote_average}</p>
        </div>
      </Link>
    </div>
  );
};

export default SerieCard;
