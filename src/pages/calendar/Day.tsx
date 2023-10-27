import { Episodes } from "@/types";
import { useNavigate } from "react-router";

interface DayProps {
  day: string;
  seriesList: Episodes[];
}

export default function Day({ day, seriesList }: DayProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-3 rounded-lg flex flex-col">
      <h2 className="mb-3 text-xl font-bold">{day}</h2>
      <div className="flex flex-wrap -m-2">
        {seriesList.map((series) => (
          <div
            className="flex m-2 justify-center align-middle cursor-pointer"
            key={series.name}
            onClick={() => navigate(`/series/${series.id}`)}
          >
            <img
              src={series.still_path}
              alt={series.name}
              className="h-20 w-auto object-cover mr-2 rounded-lg"
            />
            <div className="flex flex-col">
              <div className="text-sm">{series.name}</div>
              <div className="text-xs">Season: {series.season}</div>
              <div className="text-xs">Episode: {series.episode_number}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
