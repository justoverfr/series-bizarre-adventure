import SerieCard from "@/components/SerieCard";
import useFavoriteSeries from "@/hooks/useFavoriteSeries"; // Assurez-vous d'utiliser le bon chemin

function FavoriteSeriesList() {
  const userId = "XU5Okh6EiJXR2dkTgO2c";
  const { seriesDetails } = useFavoriteSeries(userId);

  return (
    <div>
      <h2>Vidéos Favorites</h2>
      {seriesDetails ? (
        seriesDetails.map((series, index) => (
          <div key={index}>
            <SerieCard series={series} />
          </div>
        ))
      ) : (
        <p>Chargement des séries en cours...</p>
      )}
    </div>
  );
}

export default FavoriteSeriesList;
