export default function DeliveryStep({
  value,
  onChange,
}) {
  function update(field, fieldValue) {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  }

  return (
    <section className="checkout-section">
      <header>
        <h2>Delivery Address</h2>

        <p>
          Choose where this order should
          be delivered.
        </p>
      </header>

      <div className="checkout-form">
        <label>
          Delivery address
          <textarea
            value={value.address}
            onChange={(event) =>
              update(
                "address",
                event.target.value
              )
            }
            rows={4}
            required
          />
        </label>

        <div className="checkout-location-grid">
          <label>
            Latitude
            <input
              type="number"
              step="any"
              value={
                value.latitude ?? ""
              }
              onChange={(event) =>
                update(
                  "latitude",
                  event.target.value
                    ? Number(
                        event.target.value
                      )
                    : null
                )
              }
            />
          </label>

          <label>
            Longitude
            <input
              type="number"
              step="any"
              value={
                value.longitude ?? ""
              }
              onChange={(event) =>
                update(
                  "longitude",
                  event.target.value
                    ? Number(
                        event.target.value
                      )
                    : null
                )
              }
            />
          </label>
        </div>
      </div>
    </section>
  );
}