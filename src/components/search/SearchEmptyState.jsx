import { Link } from "react-router-dom";

export default function SearchEmptyState({
  query = "",
}) {
  const normalizedQuery =
    String(query).trim();

  return (
    <section
      className="search-empty-state"
      aria-live="polite"
    >
      <div className="search-empty-state-content">
        <h2>
          {normalizedQuery
            ? "No products found"
            : "Start your search"}
        </h2>

        <p>
          {normalizedQuery
            ? `We couldn't find any products matching "${normalizedQuery}".`
            : "Search for products across the Sujula marketplace."}
        </p>

        <Link
          to="/"
          className="button button-primary"
        >
          Browse Marketplace
        </Link>
      </div>
    </section>
  );
}