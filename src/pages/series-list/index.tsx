import { useState } from "react";
import Genres from "@/components/Genres";
import { GenresType } from "@/types";
import SerieCard from "@/components/SerieCard";
import { useFetchSeries } from "@/hooks/useFetchSeries";
import { useFetchQuerySeries } from "@/hooks/useFetchQuerySeries";
import useJojo from "@/hooks/getJojo";
import Jojo from "@/components/Jojo";
import { useLocation } from "react-router-dom";

export default function SeriesList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);
  const seriesList = useFetchSeries(selectedGenres);
  const seriesQueryList = useFetchQuerySeries(query);
  const jojo = useJojo();

  const displayedSeries = query ? seriesQueryList : seriesList;

  return (
    <div>
      {jojo ? (
        <Jojo jojo={jojo} />
      ) : (
        <p>Chargement des données de Jojo en cours...</p>
      )}

      <Genres
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <div>
        <h3>Liste</h3>
        {displayedSeries.map((series, index) => (
          <div key={index}>
            <SerieCard series={series} />
          </div>
        ))}
      </div>
    </div>
  );
}
