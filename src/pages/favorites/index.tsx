import SerieCard from "@/components/SerieCard";
import useFavoriteSeries from "@/hooks/useFavoriteSeries"; // Assurez-vous d'utiliser le bon chemin

function FavoriteSeriesList() {
  const userId = "XU5Okh6EiJXR2dkTgO2c";
  const { seriesDetails } = useFavoriteSeries(userId);

  return (
    <div>
      <h3 className="font-bold text-[40px]">Vidéos Favorites</h3>
      <div className="grid grid-cols-5 gap-4 p-4">
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
    </div>
  );
}

export default FavoriteSeriesList;
