import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useRequestContext } from "../../context/RequestContext";

import landingService from "../../services/landingService";

import SearchResultsHeader from "../../components/search/SearchResultsHeader";
import SearchResultsGrid from "../../components/search/SearchResultsGrid";
import SearchEmptyState from "../../components/search/SearchEmptyState";

export default function SearchResultsPage() {
  const [searchParams] =
    useSearchParams();

  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const query =
    searchParams.get("q")?.trim() || "";

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSearchResults() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results =
          await landingService.searchProducts({
            query,
            currency,
            latitude: deliveryLatitude,
            longitude: deliveryLongitude,
          });

        if (cancelled) {
          return;
        }

        setProducts(
          Array.isArray(results)
            ? results
            : []
        );
      } catch (requestError) {
        console.error(
          "Unable to load search results.",
          requestError
        );

        if (cancelled) {
          return;
        }

        setProducts([]);
        setError(
          "Unable to load search results. Please try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSearchResults();

    return () => {
      cancelled = true;
    };
  }, [
    query,
    currency,
    deliveryLatitude,
    deliveryLongitude,
  ]);

  const showEmptyState =
    !loading &&
    !error &&
    products.length === 0;

  return (
    <main className="search-results-page">
      <SearchResultsHeader
        query={query}
        resultCount={products.length}
      />

      {loading && (
        <section
          className="search-results-loading"
          aria-live="polite"
          aria-busy="true"
        >
          <p>
            Searching for products...
          </p>
        </section>
      )}

      {error && (
        <section
          className="search-results-error"
          role="alert"
        >
          <h2>
            Something went wrong
          </h2>

          <p>{error}</p>

          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try Again
          </button>
        </section>
      )}

      {showEmptyState && (
        <SearchEmptyState
          query={query}
        />
      )}

      {!loading &&
        !error &&
        products.length > 0 && (
          <SearchResultsGrid
            products={products}
          />
        )}
    </main>
  );
}