import { useEffect, useState } from "react";
import { useRequestContext } from "../../context/RequestContext";
import landingService from "../../services/landingService";

import CategoriesHeader from "../../components/categories/CategoriesHeader";
import CategoriesGrid from "../../components/categories/CategoriesGrid";
import CategoriesEmptyState from "../../components/categories/CategoriesEmptyState";

export default function CategoriesPage() {
  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      setLoading(true);
      setError("");

      try {
        const data =
          await landingService.getLandingData({
            currency,
            latitude: deliveryLatitude,
            longitude: deliveryLongitude,
          });

        if (!mounted) {
          return;
        }

        setCategories(
          Array.isArray(data?.categories)
            ? data.categories
            : []
        );
      } catch (requestError) {
        console.error(
          "Unable to load categories.",
          requestError
        );

        if (!mounted) {
          return;
        }

        setCategories([]);
        setError(
          "Unable to load categories right now."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, [
    currency,
    deliveryLatitude,
    deliveryLongitude,
  ]);

  return (
    <main className="categories-page">
      <CategoriesHeader />

      {loading && (
        <p role="status">
          Loading categories...
        </p>
      )}

      {!loading && error && (
        <p role="alert">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        categories.length === 0 && (
          <CategoriesEmptyState />
        )}

      {!loading &&
        !error &&
        categories.length > 0 && (
          <CategoriesGrid
            categories={categories}
          />
        )}
    </main>
  );
}