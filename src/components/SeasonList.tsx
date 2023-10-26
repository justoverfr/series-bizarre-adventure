function SeasonList({
  seasons,
  seasonEpisodes,
}: {
  seasons: any;
  seasonEpisodes: any;
}) {
  return (
    <div>
      <h3>Saisons :</h3>
      {seasons?.map((season: any, seasonIndex: number) => (
        <div key={seasonIndex}>
          <p>{season.name}</p>
          {seasonEpisodes[season.season_number] && (
            <div>
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SeasonList;
