import { useEffect, useState } from "react";
import { Series } from "@/types";
import Genres from "@/components/Genres";
import { GenresType } from "@/types";

export default function SeriesList() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);
  const [selectedSerie, setSelectedSerie] = useState<Series>();
  const [serieCredit, setSerieCredits] = useState<any>();

  const genresIDs = (selectedGenres: any[]) => {
    if (selectedGenres.length < 1) return "";
    const genresID = selectedGenres?.map((genre: { id: any }) => genre?.id);
    return genresID?.reduce((acc: string, curr: string) => acc + ", " + curr);
  };

  const genreIds = genresIDs(selectedGenres);

  const getSeries = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a&with_genres=${genreIds}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSeriesList(json.results);
        setSelectedSerie(json.results[0]);
        // console.log(json.results[8]);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des séries : ",
          error
        );
      });
  };

  const getSeriesCredits = (selectedID: any) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}/credits?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setSerieCredits(json);
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
    getSeriesCredits(series.id);
  };

  useEffect(() => {
    getSeries();
  }, [selectedGenres]);

  return (
    <div>
      {selectedSerie && serieCredit && (
        <div>
          <h1>{selectedSerie.name}</h1>
          <p>{selectedSerie.overview}</p>
          <div>
            Acteurs :
            {serieCredit.cast.map((actor: any, index: any) => {
              if (actor.known_for_department === "Acting") {
                return <p key={index}>{actor.name} </p>;
              }
            })}
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedSerie.backdrop_path}`}
            alt={selectedSerie.name}
          />
        </div>
      )}

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
