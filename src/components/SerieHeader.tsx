import { Series } from "@/types";

function SerieHeader({ selectedSerie }: { selectedSerie: Series }) {
  //   console.log(selectedSerie);
  return (
    <div className="flex gap-3 w-4/5 mt-10 mx-auto bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg items-center justify-center h-fit">
      {selectedSerie && (
        <div className="flex flex-row gap-10 ">
          <img
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/w500${selectedSerie.backdrop_path}`}
            alt={selectedSerie.name}
          />
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-[40px]">{selectedSerie.name}</h1>
            <p>{selectedSerie.overview}</p>
            <p>{selectedSerie.number_of_seasons} saisons</p>
            <p>{selectedSerie.number_of_episodes} episodes</p>
            <p>{selectedSerie.first_air_date.substring(0, 4)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SerieHeader;
