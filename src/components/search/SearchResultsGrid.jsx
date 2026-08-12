import ProductCard from "../landing/cards/ProductCard";

export default function SearchResultsGrid({
  products = [],
}) {
  const safeProducts = Array.isArray(
    products
  )
    ? products
    : [];

  if (safeProducts.length === 0) {
    return null;
  }

  return (
    <section
      className="search-results-grid-section"
      aria-labelledby="search-products-heading"
    >
      <div className="search-results-section-header">
        <h2 id="search-products-heading">
          Products
        </h2>
      </div>

      <div className="card-grid">
        {safeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}