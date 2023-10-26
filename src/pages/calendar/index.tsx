import Day from "./Day";

const mondaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];
const tuesdaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];
const wednesdaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];
const thursdaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];
const fridaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];
const saturdaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];
const sundaySeries = [
  {
    title: "Bob's Burgers",
    image_url:
      "https://www.komar.de/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/4/-/4-4126_avengers_infinity_war_movie_poster_web.jpg",
  },
  {
    title: "The Simpsons",
    image_url: "",
  },
];

export default function CalendarPage() {
  return (
    <div className="flex flex-col pl-10 bg-[rgba(47,47,47,0.97)] border border-[#6643b5] p-8 ml-10 mt-10 mr-10 mb-10 rounded-lg">
      <h1 className="text-[36px] mt-2 mb-7 text-white not-italic font-medium leading-6 font-Raleway">
        Calendar
      </h1>
      <div className="flex flex-col gap-3 pl-2">
        <Day day="Monday" seriesList={mondaySeries} />
        <Day day="Tuesday" seriesList={tuesdaySeries} />
        <Day day="Wednesday" seriesList={wednesdaySeries} />
        <Day day="Thursday" seriesList={thursdaySeries} />
        <Day day="Friday" seriesList={fridaySeries} />
        <Day day="Saturday" seriesList={saturdaySeries} />
        <Day day="Sunday" seriesList={sundaySeries} />
      </div>
    </div>
  );
}
