import { useEffect, useState } from "react";
import { Series } from "@/types";
import Genres from "@/components/Genres";
import { GenresType } from "@/types";

export default function SeriesList() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);
  const [jojo, setJojo] = useState<Series>();

  const genresIDs = (selectedGenres: any[]) => {
    if (selectedGenres.length < 1) return "";
    const genresID = selectedGenres?.map((genre: { id: any }) => genre?.id);
    return genresID?.reduce((acc: string, curr: string) => acc + ", " + curr);
  };

  const genreIds = genresIDs(selectedGenres);

  useEffect(() => {
    getSeries();
    getJojo();
  }, [selectedGenres]);

  const getJojo = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/45790?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((response) => response.json())
      .then((data) => setJojo(data));
    //.then((data) => console.log(data));
  };

  const getSeries = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a&with_genres=${genreIds}`
    )
      .then((res) => res.json())
      .then((json) => setSeriesList(json.results));
  };

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
            <h2>{jojo.overview}</h2>
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
          <div key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name}
            />
            <p>{series.name}</p>
            <p>{series.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
