import { useEffect, useState } from "react";

import landingService from "../../services/landingService";
import { useRequestContext } from "../../context/RequestContext";

import ExploreHeader from "../../components/explore/ExploreHeader";
import ExploreGrid from "../../components/explore/ExploreGrid";
import ExploreEmptyState from "../../components/explore/ExploreEmptyState";

export default function ExplorePage() {
  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        /*
         * Explore currently uses the existing
         * search service without introducing
         * another data/service layer.
         *
         * An empty query is intentionally not
         * sent to searchProducts(), so we use
         * the landing catalog for discovery.
         */
        const landingData =
          await landingService.getLandingData({
            currency,
            latitude: deliveryLatitude,
            longitude: deliveryLongitude,
          });

        if (!mounted) {
          return;
        }

        const newArrivals =
          Array.isArray(
            landingData?.newArrivals
          )
            ? landingData.newArrivals
            : [];

        const bestsellers =
          Array.isArray(
            landingData?.bestsellers
          )
            ? landingData.bestsellers
            : [];

        const combinedProducts = [
          ...newArrivals,
          ...bestsellers,
        ];

        const uniqueProducts =
          combinedProducts.filter(
            (product, index, productsList) =>
              productsList.findIndex(
                (item) =>
                  item.id === product.id
              ) === index
          );

        setProducts(uniqueProducts);
      } catch (requestError) {
        console.error(
          "Unable to load explore products.",
          requestError
        );

        if (!mounted) {
          return;
        }

        setError(
          "Unable to load products right now."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [
    currency,
    deliveryLatitude,
    deliveryLongitude,
  ]);

  return (
    <main className="page explore-page">
      <ExploreHeader />

      {loading && (
        <p role="status">
          Loading products...
        </p>
      )}

      {!loading && error && (
        <p role="alert">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        products.length === 0 && (
          <ExploreEmptyState />
        )}

      {!loading &&
        !error &&
        products.length > 0 && (
          <ExploreGrid
            products={products}
          />
        )}
    </main>
  );
}