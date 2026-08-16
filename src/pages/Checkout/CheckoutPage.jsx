import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useRequestContext } from "../../context/RequestContext";

import cartService from "../../services/cartService";
import checkoutService from "../../services/checkoutService";

import IdentityStep from "../../components/checkout/IdentityStep";
import DeliveryStep from "../../components/checkout/DeliveryStep";
import PaymentStep from "../../components/checkout/PaymentStep";
import OrderReview from "../../components/checkout/OrderReview";

const STEPS = [
  "identity",
  "delivery",
  "payment",
  "review",
];

export default function CheckoutPage() {
  const {
    currency,
    deliveryAddress,
    deliveryLatitude,
    deliveryLongitude,
  } = useRequestContext();

  const [currentStep, setCurrentStep] =
    useState("identity");

  const [identity, setIdentity] =
    useState({
      fullName: "",
      phone: "",
      email: "",
    });

  const [delivery, setDelivery] =
    useState({
      address:
        deliveryAddress || "",
      latitude:
        deliveryLatitude || null,
      longitude:
        deliveryLongitude || null,
    });

  const [payment, setPayment] =
    useState({
      method: "",
    });

  const [cart, setCart] =
    useState(null);

  const [cartLoading, setCartLoading] =
    useState(true);

  const [cartError, setCartError] =
    useState(null);

  const [order, setOrder] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState(null);

  const currentIndex =
    STEPS.indexOf(currentStep);

  /*
   * ----------------------------------------
   * LOAD CURRENT CART
   * ----------------------------------------
   */

  useEffect(() => {
    let active = true;

    async function loadCart() {
      setCartLoading(true);
      setCartError(null);

      try {
        const result =
          await cartService.getCart({
            currency,
          });

        if (!active) {
          return;
        }

        setCart(result);
      } catch (requestError) {
        console.error(
          "Unable to load cart for checkout.",
          requestError
        );

        if (active) {
          setCartError(
            requestError?.response?.data
              ?.message ||
              requestError?.message ||
              "Unable to load your cart."
          );
        }
      } finally {
        if (active) {
          setCartLoading(false);
        }
      }
    }

    loadCart();

    return () => {
      active = false;
    };
  }, [currency]);

  /*
   * ----------------------------------------
   * CART ITEMS FOR ORDER PAYLOAD
   * ----------------------------------------
   *
   * The checkout API should receive the
   * product identity and requested quantity.
   *
   * Prices are not trusted from the frontend
   * as the final source of truth.
   */

  const orderItems = useMemo(() => {
    if (!Array.isArray(cart?.items)) {
      return [];
    }

    return cart.items
      .filter(
        (item) =>
          item?.productId &&
          Number(item.quantity) > 0
      )
      .map((item) => ({
        productId: item.productId,
        quantity: Math.floor(
          Number(item.quantity)
        ),
      }));
  }, [cart]);

  const hasCartItems =
    orderItems.length > 0;

  /*
   * ----------------------------------------
   * STEP VALIDATION
   * ----------------------------------------
   */

  const canContinue =
    useMemo(() => {
      if (currentStep === "identity") {
        return (
          identity.fullName.trim() &&
          identity.phone.trim()
        );
      }

      if (currentStep === "delivery") {
        return delivery.address.trim();
      }

      if (currentStep === "payment") {
        return Boolean(payment.method);
      }

      return true;
    }, [
      currentStep,
      identity,
      delivery,
      payment,
    ]);

  /*
   * ----------------------------------------
   * NAVIGATION
   * ----------------------------------------
   */

  function handleNext() {
    if (!canContinue) {
      return;
    }

    const nextIndex =
      currentIndex + 1;

    if (
      nextIndex >= STEPS.length
    ) {
      return;
    }

    setError(null);

    setCurrentStep(
      STEPS[nextIndex]
    );
  }

  function handleBack() {
    if (currentIndex <= 0) {
      return;
    }

    setError(null);

    setCurrentStep(
      STEPS[currentIndex - 1]
    );
  }

  /*
   * ----------------------------------------
   * CREATE ORDER
   * ----------------------------------------
   */

  async function handlePlaceOrder() {
    if (submitting) {
      return;
    }

    if (!hasCartItems) {
      setError(
        "Your cart is empty. Add products before placing an order."
      );

      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result =
        await checkoutService.createOrder({
          identity,
          delivery,
          payment,

          // REAL CART ITEMS
          items: orderItems,

          currency,
        });

      setOrder(result);
    } catch (requestError) {
      console.error(
        "Unable to create order.",
        requestError
      );

      setError(
        requestError?.response?.data
          ?.message ||
          requestError?.message ||
          "Unable to create order."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * ----------------------------------------
   * ORDER CREATED
   * ----------------------------------------
   */

  if (order) {
    return (
      <main className="page-container">
        <section className="checkout-success">
          <h1>Order Created</h1>

          <p>
            Your order has been
            successfully created.
          </p>

          <p>
            Order ID:{" "}
            <strong>
              {order.orderId ||
                order.id}
            </strong>
          </p>

          <div className="checkout-success-actions">
            <Link
              to="/"
              className="button button-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /*
   * ----------------------------------------
   * CART LOADING
   * ----------------------------------------
   */

  if (cartLoading) {
    return (
      <main className="page-container">
        <section className="checkout-section">
          <h1>Checkout</h1>

          <p>
            Loading your cart...
          </p>
        </section>
      </main>
    );
  }

  /*
   * ----------------------------------------
   * CART ERROR
   * ----------------------------------------
   */

  if (cartError) {
    return (
      <main className="page-container">
        <section className="checkout-section">
          <h1>Checkout</h1>

          <div
            className="checkout-error"
            role="alert"
          >
            {cartError}
          </div>

          <Link
            to="/cart"
            className="button button-primary"
          >
            Return to Cart
          </Link>
        </section>
      </main>
    );
  }

  /*
   * ----------------------------------------
   * EMPTY CART
   * ----------------------------------------
   */

  if (!hasCartItems) {
    return (
      <main className="page-container">
        <section className="checkout-section">
          <h1>Your Cart Is Empty</h1>

          <p>
            Add products to your cart
            before continuing to checkout.
          </p>

          <Link
            to="/cart"
            className="button button-primary"
          >
            Return to Cart
          </Link>
        </section>
      </main>
    );
  }

  /*
   * ----------------------------------------
   * CHECKOUT
   * ----------------------------------------
   */

  return (
    <main className="page-container checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>

        <p>
          Complete your order securely.
        </p>
      </header>

      <nav
        className="checkout-progress"
        aria-label="Checkout progress"
      >
        {STEPS.map(
          (step, index) => (
            <div
              key={step}
              className={
                index <= currentIndex
                  ? "checkout-step active"
                  : "checkout-step"
              }
            >
              <span>
                {index + 1}
              </span>

              <strong>
                {step
                  .charAt(0)
                  .toUpperCase() +
                  step.slice(1)}
              </strong>
            </div>
          )
        )}
      </nav>

      {error && (
        <div
          className="checkout-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <section className="checkout-content">
        {currentStep ===
          "identity" && (
          <IdentityStep
            value={identity}
            onChange={setIdentity}
          />
        )}

        {currentStep ===
          "delivery" && (
          <DeliveryStep
            value={delivery}
            onChange={setDelivery}
          />
        )}

        {currentStep ===
          "payment" && (
          <PaymentStep
            value={payment}
            onChange={setPayment}
          />
        )}

        {currentStep ===
          "review" && (
          <OrderReview
            identity={identity}
            delivery={delivery}
            payment={payment}
            currency={currency}
            items={cart?.items || []}
            cart={cart}
            onEdit={setCurrentStep}
          />
        )}
      </section>

      <div className="checkout-actions">
        {currentIndex > 0 && (
          <button
            type="button"
            className="button button-secondary"
            onClick={handleBack}
            disabled={submitting}
          >
            Back
          </button>
        )}

        {currentStep !==
          "review" && (
          <button
            type="button"
            className="button button-primary"
            onClick={handleNext}
            disabled={
              !canContinue ||
              submitting
            }
          >
            Continue
          </button>
        )}

        {currentStep ===
          "review" && (
          <button
            type="button"
            className="button button-primary"
            onClick={
              handlePlaceOrder
            }
            disabled={
              submitting ||
              !hasCartItems
            }
          >
            {submitting
              ? "Placing Order..."
              : "Place Order"}
          </button>
        )}
      </div>
    </main>
  );
}