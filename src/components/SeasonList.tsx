function SeasonList({
  seasons,
  seasonEpisodes,
}: {
  seasons: any;
  seasonEpisodes: any;
}) {
  const maxDescriptionLength = 20;
  const defaultImage =
    "https://image.tmdb.org/t/p/w500/2KKZF2WdfEesGs6iinlwrjyH8n.jpg";

  return (
    <div>
      {seasons?.map((season: any, seasonIndex: number) => (
        <div key={seasonIndex}>
          <p className="font-bold text-[30px]">{season.name}</p>
          {seasonEpisodes[season.season_number] && (
            <div className="flex flex-row gap-3">
              {seasonEpisodes[season.season_number].map(
                (episode: any, episodeIndex: number) => (
                  <div key={episodeIndex} className="w-[300px]">
                    <p className="font-bold text-[20px]">{episode.name}</p>
                    <img
                      className="rounded-md max-w-[200px] max-h-[300px]"
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.name}
                      onError={(e) => {
                        e.target.src = defaultImage; // Chargez l'image par défaut en cas d'erreur
                      }}
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
