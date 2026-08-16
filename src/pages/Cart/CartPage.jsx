import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import {
  useRequestContext,
} from "../../context/RequestContext";

import cartService from "../../services/cartService";

import EmptyCart from "../../components/cart/CartEmptyState/EmptyCart";
import CartItem from "../../components/cart/CartItem/CartItem";
import CartSummary from "../../components/cart/CartSummary/CartSummary";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function CartPage() {
  const {
    currency,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [cart, setCart] = useState({
    items: [],
    itemCount: 0,
    subtotal: "0",
    total: "0",
    currency,
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const loadCart = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        const data =
          await cartService.getCart({
            currency,
            latitude:
              deliveryLatitude,
            longitude:
              deliveryLongitude,
          });

        setCart({
          items: Array.isArray(
            data?.items
          )
            ? data.items
            : [],

          itemCount:
            data?.itemCount || 0,

          subtotal:
            data?.subtotal || "0",

          total:
            data?.total || "0",

          currency:
            data?.currency ||
            currency,
        });
      } catch (err) {
        console.error(
          "Unable to load cart.",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Unable to load cart."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      currency,
      deliveryLatitude,
      deliveryLongitude,
    ]
  );

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  async function handleUpdateItem(
    productId,
    quantity
  ) {
    try {
      const updatedCart =
        await cartService.updateItem({
          productId,
          quantity,
          currency,
        });

      setCart(updatedCart);
    } catch (err) {
      console.error(
        "Unable to update cart item.",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update cart item."
      );
    }
  }

  async function handleRemoveItem(
    productId
  ) {
    try {
      const updatedCart =
        await cartService.removeItem({
          productId,
          currency,
        });

      setCart(updatedCart);
    } catch (err) {
      console.error(
        "Unable to remove cart item.",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to remove cart item."
      );
    }
  }

  if (loading) {
    return (
      <main
        className="page-container"
        role="status"
      >
        <LoadingSpinner />
        <p>Loading cart...</p>
      </main>
    );
  }

  if (error && !cart.items.length) {
    return (
      <main className="page-container">
        <ErrorMessage
          message={error}
          onRetry={loadCart}
        />
      </main>
    );
  }

  if (!cart.items.length) {
    return (
      <main className="page-container">
        <h1>Your Cart</h1>

        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="page-container cart-page">
      <div className="cart-page-header">
        <div>
          <h1>Your Cart</h1>

          <p>
            {cart.itemCount}{" "}
            {cart.itemCount === 1
              ? "item"
              : "items"}{" "}
            in your cart.
          </p>
        </div>

        <Link
          to="/"
          className="button button-secondary"
        >
          Continue Shopping
        </Link>
      </div>

      {error && (
        <p
          className="cart-error"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="cart-layout">
        <section
          className="cart-items"
          aria-label="Cart items"
        >
          {cart.items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onUpdate={
                handleUpdateItem
              }
              onRemove={
                handleRemoveItem
              }
            />
          ))}
        </section>

        <CartSummary
          subtotal={cart.subtotal}
          total={cart.total}
          itemCount={cart.itemCount}
        />
      </div>
    </main>
  );
}