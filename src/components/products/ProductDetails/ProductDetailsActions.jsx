import { useState } from "react";

import cartService from "../../../services/cartService";

export default function ProductDetailsActions({
  product,
}) {
  const [addingToCart, setAddingToCart] =
    useState(false);

  const [error, setError] =
    useState(null);

  if (!product) {
    return null;
  }

  const unavailable =
    !product.stock || product.stock <= 0;

  async function handleAddToCart() {
    if (
      !product.id ||
      unavailable ||
      addingToCart
    ) {
      return;
    }

    setAddingToCart(true);
    setError(null);

    try {
      await cartService.addItem({
        productId: product.id,
        quantity: 1,
      });
    } catch (requestError) {
      console.error(
        "Unable to add product to cart.",
        requestError
      );

      setError(
        requestError.response?.data?.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAddingToCart(false);
    }
  }

  return (
    <section
      className="product-details-actions"
      aria-label="Product actions"
    >
      {error && (
        <p
          className="product-card-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        className="button button-primary"
        onClick={handleAddToCart}
        disabled={
          unavailable || addingToCart
        }
      >
        {addingToCart
          ? "Adding..."
          : unavailable
          ? "Out of Stock"
          : "Add to Cart"}
      </button>
    </section>
  );
}