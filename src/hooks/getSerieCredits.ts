import { useEffect, useState } from "react";

function fetchSerieCredits(id: string) {
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

    useEffect(() => {
        getSeriesCredits(id);
    }, [id]);

    return { serieCredit};

}
export default fetchSerieCredits