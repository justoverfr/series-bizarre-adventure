import { Series } from "@/types/Series";
import { useEffect, useState } from "react";

function useJojo() {
  const [jojo, setJojo] = useState<Series>();

  useEffect(() => {
    const fetchJojo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/45790?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
        );
        const data = await response.json();
        setJojo(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de Jojo : ", error);
      }
    };

    fetchJojo();
  }, []);

  return jojo;
}

export default useJojo;
