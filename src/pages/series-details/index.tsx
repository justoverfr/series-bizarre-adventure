import { useParams } from "react-router-dom";
import SerieHeader from "@/components/SerieHeader";
import fetchSerie from "@/hooks/useSerieData";
import fetchSerieCredits from "@/hooks/getSerieCredits";
import fetchSerieEpisodes from "@/hooks/getSerieEpisodes";

function SerieDetails() {
  const { id } = useParams();
  const { selectedSerie } = fetchSerie(id!);
  const { serieCredit } = fetchSerieCredits(id!);
  const { seasonEpisodes } = fetchSerieEpisodes(id!);

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
