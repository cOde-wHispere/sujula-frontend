import { Link } from "react-router-dom";

export default function SearchResultsHeader({
  query = "",
  resultCount = 0,
}) {
  const normalizedQuery =
    String(query).trim();

  return (
    <header className="search-results-header">
      <div>
        <p className="search-results-eyebrow">
          Marketplace Search
        </p>

        <h1>
          {normalizedQuery
            ? `Search results for "${normalizedQuery}"`
            : "Search Products"}
        </h1>

        {normalizedQuery && (
          <p className="search-results-count">
            {resultCount}{" "}
            {resultCount === 1
              ? "product"
              : "products"}{" "}
            found
          </p>
        )}
      </div>

      <Link
        to="/"
        className="button button-secondary"
      >
        Back to Marketplace
      </Link>
    </header>
  );
}