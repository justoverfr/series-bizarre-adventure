import { Actors } from "@/types/Actors";

function ActorsList({ actors }: { actors: Actors[] }) {
  const actorNames = actors.map((actor) => actor.name);
  const distribution = `${actorNames.join(", ")}`;
  return (
    <div className="flex gap-3 w-4/5 mt-10 mx-auto bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg items-center justify-center h-fit">
      <h2>Distribution:</h2>
      <p>{distribution}</p>
    </div>
  );
}

export default ActorsList;
