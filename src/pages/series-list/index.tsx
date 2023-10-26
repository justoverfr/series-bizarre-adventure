import { useState } from "react";
import { Series } from "@/types";
import Genres from "@/components/Genres";
import SerieHeader from "@/components/SerieHeader";
import { GenresType } from "@/types";
import SerieCard from "@/components/SerieCard";
import { useFetchSeries } from "@/hooks/useFetchSeries";

export default function SeriesList() {
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);
  const seriesList = useFetchSeries(selectedGenres);
  const [selectedSerie, setSelectedSerie] = useState<Series>();

  const getSerie = (selectedID: any) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((res) => res.json())
      .then((json) => {
        setSelectedSerie(json);
        console.log(json);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des crédits : ",
          error
        );
      });
  };

  const handleSeriesHover = (series: Series) => {
    setSelectedSerie(series);
    getSerie(series.id);
  };

  return (
    <div>
      <SerieHeader selectedSerie={selectedSerie!} />

      <Genres
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <div>
        <h3>Liste</h3>
        {seriesList.map((series, index) => (
          <div key={index} onMouseOver={() => handleSeriesHover(series)}>
            <SerieCard series={series} />
          </div>
        ))}
      </div>
    </div>
  );
}
