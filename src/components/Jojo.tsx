import { Series } from "@/types";

function Jojo({ jojo }: { jojo: Series }) {
  return (
    <div>
      {jojo && (
        <div>
          <img
            src="https://image.tmdb.org/t/p/w500/mLKN1dsimKPiXCZ48KED0X8a02t.jpg"
            alt={jojo.name}
          />
          <h2>{jojo.name}</h2>
          <h2>{jojo.number_of_seasons} saisons</h2>
          <h2>{jojo.number_of_episodes} épisodes</h2>
          <h2>Année de diffusion : {jojo.first_air_date.split("-")[0]}</h2>
        </div>
      )}
    </div>
  );
}

export default Jojo;
