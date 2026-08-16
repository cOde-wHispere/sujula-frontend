import {
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "../pages/LandingPage/LandingPage";
import SearchResultsPage from "../pages/SearchResults/SearchResultsPage";
import CategoriesPage from "../pages/Categories/CategoriesPage";
import PromotionsPage from "../pages/Promotions/PromotionsPage";
import ExplorePage from "../pages/Explore/ExplorePage";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Marketplace */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Product discovery */}
      <Route
        path="/explore"
        element={<ExplorePage />}
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
        path="/promotions"
        element={<PromotionsPage />}
      />

      {/* Product */}
      <Route
        path="/products/:productId"
        element={<ProductDetailsPage />}
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={<CartPage />}
      />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={<CheckoutPage />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}