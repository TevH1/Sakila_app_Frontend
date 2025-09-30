import "./style.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FilmsPage from "./pages/FilmsPage";
import FilmDetailPage from "./pages/FilmDetailPage";
import ActorsPage from "./pages/ActorsPage";
import ActorDetailPage from "./pages/ActorDetailPage";
import CustomersPage from "./pages/CustomersPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/films">Films</Link> |{" "}
        <Link to="/actors">Actors</Link> |{" "}
        <Link to="/customers">Customers</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/films/:film_id" element={<FilmDetailPage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actors/:actor_id" element={<ActorDetailPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:customer_id" element={<CustomerDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

