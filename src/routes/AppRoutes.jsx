import {
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage/LandingPage";
import SearchResultsPage from "../pages/SearchResults/SearchResultsPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/search"
        element={<SearchResultsPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}