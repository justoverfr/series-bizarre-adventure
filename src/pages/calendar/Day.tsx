interface DayProps {
  day: string;
  seriesList: any[];
}

export default function Day({ day, seriesList }: DayProps) {
  return (
    <div className="bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-3 rounded-lg flex flex-col">
      <h2 className="mb-3 text-xl font-bold">{day}</h2>
      <div className="flex flex-wrap -m-2">
        {seriesList.map((series) => (
          <div
            className="flex m-2 justify-center align-middle "
            key={series.title}
          >
            <img
              src={series.image_url}
              alt={series.title}
              className="h-20 w-auto object-cover mr-2 rounded-lg"
            />
            <div className="flex flex-col">
              <div className="text-sm">{series.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
