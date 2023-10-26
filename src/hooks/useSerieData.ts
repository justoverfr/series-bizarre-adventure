import { Series } from "@/types/Series";
import { useEffect, useState } from "react";

function fetchSerie(id: string) {
    const [selectedSerie, setSelectedSerie] = useState<Series>();
    const [seasonEpisodes, setSeasonEpisodes] = useState<any>({});

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

    const getSeasonEpisodes = (selectedID: any, seasonNumber: number) => {
        fetch(
          `https://api.themoviedb.org/3/tv/${selectedID}/season/${seasonNumber}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log(json.episodes);
            setSeasonEpisodes((prevEpisodes: any) => ({
              ...prevEpisodes,
              [seasonNumber]: json.episodes,
            }));
          })
          .catch((error) => {
            console.error(
              `Une erreur s'est produite lors de la récupération des épisodes de la saison ${seasonNumber} : `,
              error
            );
          });
      };

      useEffect(() => {
        getSerie(id);
      }, [id]);

      useEffect(() => {
        if (selectedSerie) {
          selectedSerie.seasons.forEach((season: { season_number: number }) => {
            getSeasonEpisodes(id, season.season_number);
          });
        }
      }, [selectedSerie, id]);

      return { selectedSerie, seasonEpisodes};

}
export default fetchSerie