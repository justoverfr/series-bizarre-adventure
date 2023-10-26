import { useState, useEffect } from "react";

export function useFetchSerieDetails(selectedID : any) {
  const [selectedSerie, setSelectedSerie] = useState(null);

  useEffect(() => {
    if (selectedID) {
      fetch(
        `https://api.themoviedb.org/3/tv/${selectedID}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
      )
        .then((res) => res.json())
        .then((json) => {
          setSelectedSerie(json);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des crédits : ",
            error
          );
        });
    }
  }, [selectedID]);

  return selectedSerie;
}
