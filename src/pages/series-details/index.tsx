import { useParams } from "react-router-dom";
import SerieHeader from "@/components/SerieHeader";
import { Series } from "@/types";
import { useEffect, useState } from "react";

function SerieDetails() {
  const { id } = useParams();
  const [selectedSerie, setSelectedSerie] = useState<Series>();
  const [serieCredit, setSerieCredits] = useState<any>();
  const [seasonEpisodes, setSeasonEpisodes] = useState<any>({});

  const getSeriesCredits = (selectedID: any) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}/credits?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((res) => res.json())
      .then((json) => {
        setSerieCredits(json);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des crédits : ",
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
    getSeriesCredits(id);
  }, [id]);

  useEffect(() => {
    if (selectedSerie) {
      selectedSerie.seasons.forEach((season: { season_number: number }) => {
        getSeasonEpisodes(id, season.season_number);
      });
    }
  }, [selectedSerie, id]);

  return (
    <>
      <div>
        <SerieHeader selectedSerie={selectedSerie!} serieCredit={serieCredit} />
      </div>
      <div>
        Acteurs :{" "}
        {serieCredit
          ? serieCredit.cast
              .filter((actor: any) => actor.known_for_department === "Acting")
              .map((actor: any) => actor.name)
              .join(", ")
          : "Chargement des acteurs en cours..."}
      </div>

      <div>
        Saisons :
        <ul>
          {selectedSerie?.seasons?.map((season: any, index: any) => (
            <li key={index}>
              <p>{season.name}</p>
              {seasonEpisodes[season.season_number] && (
                <ul>
                  {seasonEpisodes[season.season_number].map(
                    (episode: any, episodeIndex: number) => (
                      <div key={episodeIndex}>
                        <p>
                          Épisode {episode.episode_number}: {episode.name}
                        </p>
                        <p>Description : {episode.overview}</p>
                        <p>date : {episode.air_date}</p>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                          alt={episode.name}
                        />
                      </div>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SerieDetails;
