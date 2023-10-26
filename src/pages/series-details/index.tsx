import { useParams } from "react-router-dom";
import SerieHeader from "@/components/SerieHeader";
import { Series } from "@/types";
import { useEffect, useState } from "react";

function SerieDetails() {
  const { id } = useParams();
  const [selectedSerie, setSelectedSerie] = useState<Series>();
  const [serieCredit, setSerieCredits] = useState<any>();

  const getSeriesCredits = (selectedID: any) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}/credits?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((res) => res.json())
      .then((json) => {
        setSerieCredits(json);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des crédits : ",
          error
        );
      });
  };

  const getSerie = (selectedID: any) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${selectedID}?api_key=2ec96d5b6b5bfb03b3f398ea23d78b3a`
    )
      .then((res) => res.json())
      .then((json) => {
        setSelectedSerie(json);
        console.log(json);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des crédits : ",
          error
        );
      });
  };

  useEffect(() => {
    getSeriesCredits(id);
    getSerie(id);
  }, [id]);

  return (
    <div>
      <SerieHeader selectedSerie={selectedSerie} serieCredit={serieCredit} />
    </div>
  );
}

export default SerieDetails;
