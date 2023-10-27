import { useState, useEffect } from "react";

export function useFetchQuerySeries(query : any) {
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a&query=${query}`
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
  });

  return seriesList;
}
