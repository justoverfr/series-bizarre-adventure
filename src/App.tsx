// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeriesList from "./pages/series-list";
import SignUpPage from "@/pages/signup/index";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          {/* Liste des pages */}
          <Route
            path="/"
            element={<h1 className="text-3xl font-bold underline">Home</h1>}
          />
          <Route path="/user" element={<h1>Profil</h1>} />
          <Route path="/series-list" element={ <SeriesList/>} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
