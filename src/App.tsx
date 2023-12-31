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
import LogInPage from "./pages/login";
import FavoriteSeriesList from "./pages/favorites";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          {/* Liste des pages */}
          <Route element={<DefaultContainer />}>
            <Route path="/user" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoriteSeriesList />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/" element={<SeriesList />} />
            <Route path="/series/:id" element={<SeriesDetails />} />
          </Route>

          <Route element={<AuthContainer />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
          </Route>

          <Route
            path="/"
            element={<h1 className="text-3xl font-bold underline">Home</h1>}
          />
          <Route path="/user" element={<h1>Profil</h1>} />

          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/favorites" element={<FavoriteSeriesList />} />
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
