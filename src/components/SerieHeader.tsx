import { Series } from "@/types";

function SerieHeader({
  selectedSerie,
  serieCredit,
}: {
  selectedSerie: Series;
  serieCredit: any;
}) {
  //   console.log(selectedSerie);
  return (
    <div>
      {selectedSerie && serieCredit && (
        <div>
          <h1>{selectedSerie.name}</h1>
          <p>{selectedSerie.overview}</p>
          <p>{selectedSerie.number_of_seasons} saisons</p>
          <p>{selectedSerie.number_of_episodes} episodes</p>
          <p>{selectedSerie.first_air_date.substring(0, 4)}</p>

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
