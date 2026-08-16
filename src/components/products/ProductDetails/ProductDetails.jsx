import ProductDetailsInfo from "./ProductDetailsInfo";
import ProductDetailsActions from "./ProductDetailsActions";

export default function ProductDetails({
  product,
}) {
  if (!product) {
    return null;
  }

  return (
    <article className="product-details">
      <div className="product-details-media">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
          />
        ) : (
          <div
            className="product-details-image-placeholder"
            aria-label="Product image unavailable"
          >
            Product Image
          </div>
        )}
      </div>

      <div className="product-details-content">
        <ProductDetailsInfo
          product={product}
        />

        <ProductDetailsActions
          product={product}
        />
      </div>
    </article>
  );
}