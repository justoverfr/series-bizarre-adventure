import Day from "./Day";
export default function CalendarPage() {
  return (
    <>
      <h1 className="text-[36px] mb-5 text-white not-italic font-medium leading-6 font-Raleway">
        Calendar
      </h1>
      <Day day="Monday" />
      <Day day="Tuesday" />
      <Day day="Wednesday" />
      <Day day="Thursday" />
      <Day day="Friday" />
      <Day day="Saturday" />
      <Day day="Sunday" />
    </>
  );
}
