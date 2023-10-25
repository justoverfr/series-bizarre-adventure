export interface GenresType {
    id: number;
    name: string;
}

export interface GenresSet {
    genres: GenresType[]; 
    setGenres: React.Dispatch<React.SetStateAction<GenresType[]>>;
    selectedGenres: GenresType[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<GenresType[]>>;
  }
  