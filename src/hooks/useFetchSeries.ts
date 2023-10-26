import { useState, useEffect } from "react";

export function useFetchSeries(selectedGenres : any) {
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    const genreIds = selectedGenres.map((genre: any) => genre.id).join(",");
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a&with_genres=${genreIds}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSeriesList(json.results);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des séries : ",
          error
        );
      });
  }, [selectedGenres]);

  return seriesList;
}
