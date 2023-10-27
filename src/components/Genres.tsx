import { useEffect } from "react";
import { GenresType, GenresSet } from "@/types";

const Genres = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
}: GenresSet) => {
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a"
    );
    const data = await response.json();
    setGenres(data?.genres);
  };

  const handleAddGenres = (genre: GenresType) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres?.filter((g) => g?.id !== genre?.id));
  };

  const handleRemoveGenres = (genre: GenresType) => {
    setSelectedGenres(
      selectedGenres?.filter((selected) => selected?.id !== genre?.id)
    );
    setGenres([...genres, genre]);
  };

  return (
    <div className="flex flex-row gap-3 p-3 items-center justify-center">
      <p className=" text-[32px]">Genres :</p>
      <div>
        {selectedGenres?.map((genre) => (
          <button
            className=" bg-[rgba(65,65,65,0.77)] border border-[#efd471] p-2 rounded-lg items-center justify-center mr-10px"
            key={genre.id}
            onClick={() => handleRemoveGenres(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div>
        {genres.map((genre: GenresType) => (
          <button
            className=" bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-2 rounded-lg items-center justify-center"
            key={genre.id}
            onClick={() => handleAddGenres(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Genres;
