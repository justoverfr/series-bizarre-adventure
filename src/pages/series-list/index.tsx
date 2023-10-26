import { useEffect, useState } from "react";
import { Series } from "@/types";
import Genres from "@/components/Genres";
import SerieHeader from "@/components/SerieHeader";
import { GenresType } from "@/types";
import SerieCard from "@/components/SerieCard";

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
        console.log(json.results[0].id);
        setSeriesList(json.results);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des séries : ",
          error
        );
      });
  };

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
    getSerie(series.id);
  };

  useEffect(() => {
    getSeries();
  }, [selectedGenres]);

  return (
    <div>
      <SerieHeader selectedSerie={selectedSerie!} serieCredit={serieCredit} />

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
