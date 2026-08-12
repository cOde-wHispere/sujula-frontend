import {
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage/LandingPage";
import SearchResultsPage from "../pages/SearchResults/SearchResultsPage";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import ExplorePage from "../pages/Explore/ExplorePage";
import PromotionsPage from "../pages/Promotions/PromotionsPage";
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
        path="/categories"
        element={<CategoriesPage />}
      />

      <Route
        path="/explore"
        element={<ExplorePage />}
      />

      <Route
        path="/promotions"
        element={<PromotionsPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}