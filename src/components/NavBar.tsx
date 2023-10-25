import { UserCircle2 } from "lucide-react";
import { BellDot } from "lucide-react";
import { Search } from "lucide-react";

const strokeWidth = 1.5;

function NavBar() {
  return (
    <div className="flex justify-between sticky bg-[rgba(65,65,65,0.77)]   p-8  ">
      <ul className="flex flex-row max-w-xl gap-5">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Calendar</a>
        </li>
        <li>
          <a href="#">Shows</a>
        </li>
        <li>
          <a href="#">Favoris</a>
        </li>
      </ul>
      <div className="flex flex-row gap-3">
        <input
          className=" px-4 py-1 w-full rounded-md bg-[#242424] focus:outline-none focus:ring-2 focus:ring-[#6643b5] focus:border-transparent"
          placeholder="Search"
        />
        <Search size={28} color="#ffffff" strokeWidth={1.5} />
      </div>
      <div className="flex flex-row gap-5">
        <BellDot
          className="cursor-pointer	"
          size={28}
          color="#ffffff"
          strokeWidth={strokeWidth}
          onClick={() => console.log("testBell")}
        />
        <UserCircle2
          className="cursor-pointer	"
          size={28}
          color="#ffffff"
          strokeWidth={strokeWidth}
          onClick={() => console.log("testProfile")}
        />
      </div>
    </div>
  );
}

export default NavBar;
