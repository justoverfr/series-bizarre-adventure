import { Actors } from "@/types/Actors";

function ActorsList({ actors }: { actors: Actors[] }) {
  const actorNames = actors.map((actor) => actor.name);
  const distribution = `Distribution : ${actorNames.join(", ")}`;
  return (
    <div>
      <h2>Acteurs</h2>
      <p>{distribution}</p>
    </div>
  );
}

export default ActorsList;
