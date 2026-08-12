import ProductCard from "../landing/cards/ProductCard";

export default function ExploreGrid({
  products = [],
}) {
  const safeProducts = Array.isArray(
    products
  )
    ? products
    : [];

  return (
    <section
      className="explore-grid-section"
      aria-label="Explore marketplace products"
    >
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