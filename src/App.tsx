import {
  BrowserRouter as Router,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";
import SignUpPage from "@/pages/signup/index";
import CalendarPage from "./pages/calendar";
import NavBar from "./components/NavBar";
import SeriesList from "./pages/series-list";
import SeriesDetails from "./pages/series-details";
import ProfilePage from "./pages/profil";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          {/* Liste des pages */}
          <Route element={<DefaultContainer />}>
            <Route path="/user" element={<ProfilePage />} />

            <Route path="/calendar" element={<CalendarPage />} />
          </Route>

          <Route element={<AuthContainer />}>
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          <Route
            path="/"
            element={<h1 className="text-3xl font-bold underline">Home</h1>}
          />
          <Route path="/user" element={<h1>Profil</h1>} />
          <Route path="/series-list" element={<SeriesList />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/series/:id" element={<SeriesDetails />} />
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
