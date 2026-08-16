import { Link } from "react-router-dom";

export default function CartSummary({
  subtotal,
  total,
  itemCount,
}) {
  return (
    <aside
      className="cart-summary"
      aria-label="Cart summary"
    >
      <h2>Order Summary</h2>

      <div className="cart-summary-row">
        <span>
          Items ({itemCount})
        </span>

        <strong>
          {subtotal}
        </strong>
      </div>

      <div className="cart-summary-row">
        <span>Subtotal</span>

        <strong>
          {subtotal}
        </strong>
      </div>

      <div className="cart-summary-total">
        <span>Total</span>

        <strong>
          {total}
        </strong>
      </div>

      <Link
        to="/checkout"
        className="button button-primary cart-checkout-button"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}