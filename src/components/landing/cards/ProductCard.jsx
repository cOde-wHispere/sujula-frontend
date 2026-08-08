import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import cartService from "../../../services/cartService";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const [addingToCart, setAddingToCart] =
    useState(false);

  const [cartError, setCartError] =
    useState(null);

  function handleViewProduct() {
    if (!product?.name) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(product.name)}`
    );
  }

  async function handleAddToCart() {
    if (!product?.id || addingToCart) {
      return;
    }

    setAddingToCart(true);
    setCartError(null);

    try {
      await cartService.addItem({
        productId: product.id,
        quantity: 1,
      });
    } catch (error) {
      console.error(
        "Unable to add product to cart.",
        error
      );

      setCartError(
        error.response?.data?.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAddingToCart(false);
    }
  }

  return (
    <article className="product-card">
      {product?.image && (
        <img
          src={product.image}
          alt={product?.name || "Product"}
          loading="lazy"
        />
      )}

      <h3>{product?.name}</h3>

      <p className="product-price">
        {product?.price}
      </p>

      {cartError && (
        <p
          className="product-card-error"
          role="alert"
        >
          {cartError}
        </p>
      )}

      <div className="product-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={handleViewProduct}
          disabled={!product?.name}
        >
          View
        </button>

        <button
          type="button"
          className="button button-primary"
          onClick={handleAddToCart}
          disabled={
            !product?.id || addingToCart
          }
        >
          {addingToCart
            ? "Adding..."
            : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default memo(ProductCard);