import { UserCircle2 } from "lucide-react";
import { BellDot } from "lucide-react";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const strokeWidth = 1.5;

function NavBar() {
  const [searchQuery, setSearchQuery] = useState(""); // État pour stocker la recherche

  const handleSearchInputChange = (e: any) => {
    // Gérez le changement de l'input de recherche
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-between sticky bg-[rgba(65,65,65,0.77)] p-8">
      <ul className="flex flex-row max-w-xl gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/favorites">Favoris</Link>
        </li>
      </ul>
      <div className="flex items-center w-3/5 gap-3">
        <input
          className="flex-grow px-4 py-1 rounded-md bg-[#242424] focus:outline-none focus:ring-2 focus:ring-[#6643b5] focus:border-transparent"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Link to={`/?query=${searchQuery}`}>
          <Search size={28} color="#ffffff" strokeWidth={1.5} />
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <BellDot
          className="cursor-pointer"
          size={28}
          color="#ffffff"
          strokeWidth={strokeWidth}
          onClick={() => console.log("testBell")}
        />
        <UserCircle2
          className="cursor-pointer"
          size={28}
          color="#ffffff"
          strokeWidth={strokeWidth}
          onClick={() => navigate("/user")}
        />
      </div>
    </div>
  );
}

export default NavBar;
