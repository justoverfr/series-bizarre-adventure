import { Series } from "@/types";

function Jojo({ jojo }: { jojo: Series }) {
  return (
    <div>
      {jojo && (
        <div className="flex gap-10 items-center">
          <img
            className="rounded-md"
            src="https://image.tmdb.org/t/p/w500/mLKN1dsimKPiXCZ48KED0X8a02t.jpg"
            alt={jojo.name}
          />
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-[40px] ">{jojo.name}</h2>
            <h2>{jojo.number_of_seasons} saisons</h2>
            <h2>{jojo.number_of_episodes} épisodes</h2>
            <h2>Année de diffusion : {jojo.first_air_date.split("-")[0]}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jojo;
