import { useEffect, useState } from "react";
import { Series } from "@/types";
import Genres from "@/components/Genres";
import { GenresType } from "@/types";
import SerieCard from "@/components/SerieCard";
import { useFetchSeries } from "@/hooks/useFetchSeries";

export default function SeriesList() {
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);
  const seriesList = useFetchSeries(selectedGenres);
  const [, setSelectedSerie] = useState<Series>();
  const [jojo, setJojo] = useState<Series>();

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

  const getJojo = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/45790?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((response) => response.json())
      .then((data) => setJojo(data));
  };

  useEffect(() => {
    getJojo();
  });

  return (
    <div>
      <div>
        <img
          src="https://image.tmdb.org/t/p/w500/mLKN1dsimKPiXCZ48KED0X8a02t.jpg"
          alt=""
        />
        {jojo && (
          <div>
            <h2>{jojo.name}</h2>
            <h2>{jojo.number_of_seasons} saisons</h2>
            <h2>{jojo.number_of_episodes} épisodes</h2>
            <h2>Année de diffusion : {jojo.first_air_date.split("-")[0]}</h2>
          </div>
        )}
      </div>

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
