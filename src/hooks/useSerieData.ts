import { Series } from "@/types/Series";
import { useEffect, useState } from "react";

function fetchSerie(id: string) {
    const [selectedSerie, setSelectedSerie] = useState<Series>();

    const getSerie = (selectedID: any) => {
        fetch(
          `https://api.themoviedb.org/3/tv/${selectedID}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
        )
          .then((res) => res.json())
          .then((json) => {
            setSelectedSerie(json);
            // console.log(json);
          })
          .catch((error) => {
            console.error(
              "Une erreur s'est produite lors de la récupération des crédits : ",
              error
            );
          });
      };

    

      useEffect(() => {
        getSerie(id);
      }, [id]);

      return { selectedSerie};

}
export default fetchSerie