import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <section className="empty-cart">
      <h2>Your cart is empty</h2>

      <p>
        Browse our marketplace and add
        products to your cart.
      </p>

      <Link
        to="/"
        className="button button-primary"
      >
        Start Shopping
      </Link>
    </section>
  );
}