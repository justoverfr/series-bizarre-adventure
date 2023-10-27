import { ReleaseSchedule } from "@/types";
import { getDayName } from "@/lib/utils";

async function addSerieUpcomingEpisodesToSchedule(
  serieId: number,
  schedule: ReleaseSchedule
): Promise<void> {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDJmNmIwNjUzZDk0NzVlMmZlM2I3OTk2YmM2ZDlkMCIsInN1YiI6IjY1MzkyMmVjYWUzNjY4MDE0ZGE2OGNiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iuKQOPEYRs10jksJmgiEJ4VKOhJsn0qxpUcTVoYWerI`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  if (data.next_episode_to_air) {
    const airDate = new Date(data.next_episode_to_air.air_date);
    if (airDate >= today && airDate <= nextWeek) {
      const dayName = getDayName(airDate);
      if (!schedule[dayName]) {
        schedule[dayName] = [];
      }

      schedule[dayName].push({
        name: data.name,
        id: serieId,
        episode_number: data.next_episode_to_air.episode_number,
        still_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        season: data.next_episode_to_air.season_number,
      });
    }
  }
}

export async function getFavoritesUpcomingReleases(
  favoritesId: number[]
): Promise<ReleaseSchedule> {
  const schedule: ReleaseSchedule = {};
  // Pour chaque série favorite...
  for (const id of favoritesId) {
    await addSerieUpcomingEpisodesToSchedule(id, schedule);
    // ...on ajoute les épisodes à venir dans le calendrier
  }
  return schedule;
}
