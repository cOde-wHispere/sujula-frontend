import ProductCard from "./cards/ProductCard";

export default function NewArrivalsSection({
  products = [],
}) {
  const safeProducts = Array.isArray(products)
    ? products
    : [];

  return (
    <section id="new-arrivals">
      <h2>New Arrivals</h2>

      <div className="card-grid">
        {safeProducts.length > 0 ? (
          safeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No new arrivals available.</p>
        )}
      </div>
    </section>
  );
}