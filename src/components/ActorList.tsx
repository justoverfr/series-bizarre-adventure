import { Actors } from "@/types/Actors";

function ActorsList({ actors }: { actors: Actors[] }) {
  return (
    <div>
      <h2>Acteurs</h2>
      {actors.map((actor) => (
        <p key={actor.id}>{actor.name}</p>
      ))}
    </div>
  );
}

export default ActorsList;
