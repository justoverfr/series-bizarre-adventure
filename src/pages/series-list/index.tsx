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
      <div className="flex gap-3 w-4/5 mt-10 mx-auto bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg items-center justify-center h-fit">
        {jojo ? (
          <Jojo jojo={jojo} />
        ) : (
          <p>Chargement des données de Jojo en cours...</p>
        )}
      </div>
      <div className="">
        <Genres
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
      </div>
      <h3 className="font-bold text-[40px]">Nos Séries </h3>
      <div className="grid grid-cols-5 gap-4 p-4">
        {seriesList.map((series, index) => (
          <div key={index}>
            <SerieCard series={series} />
          </div>
        ))}
      </div>
    </div>
  );
}
