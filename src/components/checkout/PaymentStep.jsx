const PAYMENT_METHODS = [
  {
    id: "cash_on_delivery",
    label: "Cash on Delivery",
    description:
      "Pay when your order is delivered.",
  },
  {
    id: "wave",
    label: "Wave",
    description:
      "Pay using Wave.",
  },
  {
    id: "qmoney",
    label: "QMoney",
    description:
      "Pay using QMoney.",
  },
];

export default function PaymentStep({
  value,
  onChange,
}) {
  return (
    <section className="checkout-section">
      <header>
        <h2>Payment</h2>

        <p>
          Select your preferred payment
          method.
        </p>
      </header>

      <div className="payment-options">
        {PAYMENT_METHODS.map(
          (method) => (
            <label
              key={method.id}
              className={
                value.method ===
                method.id
                  ? "payment-option selected"
                  : "payment-option"
              }
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={
                  value.method ===
                  method.id
                }
                onChange={(event) =>
                  onChange({
                    ...value,
                    method:
                      event.target.value,
                  })
                }
              />

              <span>
                <strong>
                  {method.label}
                </strong>

                <small>
                  {method.description}
                </small>
              </span>
            </label>
          )
        )}
      </div>
    </section>
  );
}