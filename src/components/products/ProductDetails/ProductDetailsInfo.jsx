export default function ProductDetailsInfo({
  product,
}) {
  if (!product) {
    return null;
  }

  return (
    <section
      className="product-details-info"
      aria-labelledby="product-details-title"
    >
      <div className="product-details-category">
        {product.category}
      </div>

      <h1 id="product-details-title">
        {product.name}
      </h1>

      <p className="product-details-price">
        {product.price}
      </p>

      <p className="product-details-description">
        {product.description}
      </p>

      <dl className="product-details-meta">
        <div>
          <dt>Seller</dt>
          <dd>{product.seller}</dd>
        </div>

        <div>
          <dt>SKU</dt>
          <dd>{product.sku}</dd>
        </div>

        <div>
          <dt>Availability</dt>
          <dd>
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </dd>
        </div>
      </dl>
    </section>
  );
}