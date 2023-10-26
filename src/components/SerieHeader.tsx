function SerieHeader({ selectedSerie, serieCredit }) {
  return (
    <div>
      {selectedSerie && serieCredit && (
        <div>
          <h1>{selectedSerie.name}</h1>
          <p>{selectedSerie.overview}</p>
          <p>{selectedSerie.number_of_seasons} saisons</p>
          <p>{selectedSerie.number_of_episodes} episodes</p>
          <p>{selectedSerie.first_air_date.substring(0, 4)}</p>

          <div>
            Acteurs :
            {serieCredit.cast.map((actor: any, index: any) => {
              if (actor.known_for_department === "Acting") {
                return <p key={index}>{actor.name}</p>;
              }
              return null;
            })}
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedSerie.backdrop_path}`}
            alt={selectedSerie.name}
          />
        </div>
      )}
    </div>
  );
}

export default SerieHeader;
