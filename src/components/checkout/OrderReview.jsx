import { useNavigate } from "react-router-dom";

export default function OrderReview({
  identity,
  delivery,
  payment,
  currency,
  items = [],
  cart,
  onEdit,
}) {
  const navigate = useNavigate();

  function handleEditCart() {
    navigate("/cart");
  }

  return (
    <section className="checkout-section">
      <header>
        <h2>Review Order</h2>

        <p>
          Confirm your information and products
          before placing the order.
        </p>
      </header>

      <div className="order-review">
        {/* -------------------------------- */}
        {/* CART */}
        {/* -------------------------------- */}

        <section className="order-review-section">
          <div className="order-review-heading">
            <h3>Items</h3>

            <button
              type="button"
              className="button button-link"
              onClick={handleEditCart}
            >
              Edit Cart
            </button>
          </div>

          {items.length === 0 ? (
            <p>No products in cart.</p>
          ) : (
            <div className="order-review-items">
              {items.map((item) => (
                <article
                  key={
                    item.productId ||
                    item.id
                  }
                  className="order-review-item"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={
                        item.name ||
                        "Product"
                      }
                      loading="lazy"
                    />
                  )}

                  <div>
                    <h4>
                      {item.name}
                    </h4>

                    <p>
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                    <p>
                      Unit price:{" "}
                      {item.unitPrice}
                    </p>

                    <p>
                      Subtotal:{" "}
                      {item.subtotal}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {cart && (
            <div className="order-review-total">
              <p>
                Items:{" "}
                <strong>
                  {cart.itemCount}
                </strong>
              </p>

              <p>
                Subtotal:{" "}
                <strong>
                  {cart.subtotal}
                </strong>
              </p>

              <p>
                Total:{" "}
                <strong>
                  {cart.total}
                </strong>
              </p>
            </div>
          )}
        </section>

        {/* -------------------------------- */}
        {/* IDENTITY */}
        {/* -------------------------------- */}

        <section className="order-review-section">
          <div className="order-review-heading">
            <h3>Identity</h3>

            <button
              type="button"
              className="button button-link"
              onClick={() =>
                onEdit("identity")
              }
            >
              Edit
            </button>
          </div>

          <p>
            <strong>
              {identity.fullName}
            </strong>
          </p>

          <p>
            {identity.phone}
          </p>

          {identity.email && (
            <p>
              {identity.email}
            </p>
          )}
        </section>

        {/* -------------------------------- */}
        {/* DELIVERY */}
        {/* -------------------------------- */}

        <section className="order-review-section">
          <div className="order-review-heading">
            <h3>Delivery</h3>

            <button
              type="button"
              className="button button-link"
              onClick={() =>
                onEdit("delivery")
              }
            >
              Edit
            </button>
          </div>

          <p>
            {delivery.address}
          </p>

          {delivery.latitude !==
            null &&
            delivery.longitude !==
              null && (
              <p>
                Coordinates:{" "}
                {delivery.latitude},{" "}
                {delivery.longitude}
              </p>
            )}
        </section>

        {/* -------------------------------- */}
        {/* PAYMENT */}
        {/* -------------------------------- */}

        <section className="order-review-section">
          <div className="order-review-heading">
            <h3>Payment</h3>

            <button
              type="button"
              className="button button-link"
              onClick={() =>
                onEdit("payment")
              }
            >
              Edit
            </button>
          </div>

          <p>
            {payment.method}
          </p>
        </section>

        {/* -------------------------------- */}
        {/* CURRENCY */}
        {/* -------------------------------- */}

        <section className="order-review-section">
          <h3>Currency</h3>

          <p>
            {String(currency).toUpperCase()}
          </p>
        </section>
      </div>
    </section>
  );
}