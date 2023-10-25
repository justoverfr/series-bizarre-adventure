interface DayProps {
  day: string;
}
export default function Day({ day }: DayProps) {
  return (
    <div className="flex flex-col  w-3/5 mt-[25px] ml-2.5px bg-[rgba(65,65,65,0.77)] border border-[#6643b5] p-8 rounded-lg">
      {day}
    </div>
  );
}
