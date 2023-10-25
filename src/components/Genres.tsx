import { useEffect } from "react";
import { GenresType, GenresSet } from "@/types";

const Genres = ({ genres, setGenres, selectedGenres, setSelectedGenres }: GenresSet) => {

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a"
    );
    const data = await response.json();
    setGenres(data?.genres);
  }

  const handleAddGenres = (genre: GenresType) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres?.filter(g => g?.id !== genre?.id))
  }

  const handleRemoveGenres = (genre: GenresType) => {
    setSelectedGenres(selectedGenres?.filter(selected => selected?.id !== genre?.id ))
    setGenres([...genres, genre])
  }

  return (
    <div>
      <p>Genres:</p>
        {selectedGenres?.map(genre => (
            <button key={genre.id} onClick={() =>handleRemoveGenres(genre)}>{genre.name}</button>
        ) ) 

        }
        {genres.map((genre: GenresType) => (
          <button key={genre.id} onClick={() => handleAddGenres(genre)}>{genre.name}</button>
        ))}
    </div>
  );
};

export default Genres;
