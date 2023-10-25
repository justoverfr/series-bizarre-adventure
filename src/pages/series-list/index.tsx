import { useEffect, useState } from "react";
import { Series } from "@/types";
import Genres from "@/components/Genres";
import { GenresType } from "@/types";

export default function SeriesList() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([]);


  const genresIDs = (selectedGenres: any[]) => {
    if (selectedGenres.length < 1) return "";
    const genresID = selectedGenres?.map((genre: { id: any; }) => genre?.id);
    return genresID?.reduce((acc: string, curr: string) => acc + ', ' + curr)
  }

  const genreIds = genresIDs(selectedGenres)

  useEffect(() => {
    getSeries();
  }, [selectedGenres]);

  const getSeries = () => {
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a&with_genres=${genreIds}`)
      .then((res) => res.json())
      .then((json) => setSeriesList(json.results));
  } 

  return (
    <><Genres   
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        />
        <div>
          {seriesList.map((series, index) => (
              <div key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt={series.name} />
                  <p>{series.name}</p>
                  <p>{series.vote_average}</p>
              </div>
          ))}
      </div></>
  );
}
