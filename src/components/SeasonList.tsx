function SeasonList({
  seasons,
  seasonEpisodes,
}: {
  seasons: any;
  seasonEpisodes: any;
}) {
  const maxDescriptionLength = 20;

  return (
    <div>
      {seasons?.map((season: any, seasonIndex: number) => (
        <div key={seasonIndex}>
          <p className="font-bold text-[30px]">{season.name}</p>
          {seasonEpisodes[season.season_number] && (
            <div className="flex flex-row gap-3">
              {seasonEpisodes[season.season_number].map(
                (episode: any, episodeIndex: number) => (
                  <div key={episodeIndex}>
                    <p className="font-bold text-[20px]">
                      Épisode {episode.episode_number}: {episode.name}
                    </p>
                    <img
                      className="rounded-md"
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.name}
                    />
                    <p>
                      Description :{" "}
                      {episode.overview.slice(0, maxDescriptionLength)}
                    </p>
                    {episode.overview.length > maxDescriptionLength && (
                      <p>
                        ... <a href="#">Voir plus</a>
                      </p>
                    )}
                    <p>date : {episode.air_date}</p>
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
