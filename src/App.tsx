// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import {
  BrowserRouter as Router,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from "@/pages/signup/index";
import CalendarPage from "./pages/calendar";
import NavBar from "./components/NavBar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          {/* Liste des pages */}
          <Route element={<DefaultContainer />}>
            <Route path="/user" element={<h1>Profil</h1>} />

            <Route path="/calendar" element={<CalendarPage />} />
          </Route>

          <Route element={<AuthContainer />}>
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          <Route
            path="/"
            element={<h1 className="text-3xl font-bold underline">Home</h1>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const DefaultContainer = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const AuthContainer = () => (
  <>
    <Outlet />
  </>
);
