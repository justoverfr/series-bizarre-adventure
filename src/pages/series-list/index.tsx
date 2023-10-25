import { useEffect, useState } from "react";
import { Series } from "@/types";

export default function SeriesList() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);

  const getSeries = () => {
    fetch("https://api.themoviedb.org/3/discover/tv?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a")
      .then((res) => res.json())
      .then((json) => setSeriesList(json.results));
  }

  useEffect(() => {
    getSeries();
  }, []);

  console.log(seriesList);

  return (
    <div>
      {seriesList.map((series, index) => (
        <img key={index} src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
      ))}
    </div>
  );
}
