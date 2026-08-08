import ProductCard from "./cards/ProductCard";

export default function BestsellersSection({
  products = [],
}) {
  const safeProducts = Array.isArray(products)
    ? products
    : [];

  return (
    <section id="bestsellers">
      <h2>Bestsellers</h2>

      <div className="card-grid">
        {safeProducts.length > 0 ? (
          safeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No bestsellers available.</p>
        )}
      </div>
    </section>
  );
}