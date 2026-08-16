export default function IdentityStep({
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
        <h2>Confirm Identity</h2>

        <p>
          Provide the contact information
          required to complete your order.
        </p>
      </header>

      <div className="checkout-form">
        <label>
          Full name
          <input
            type="text"
            value={value.fullName}
            onChange={(event) =>
              update(
                "fullName",
                event.target.value
              )
            }
            autoComplete="name"
            required
          />
        </label>

        <label>
          Phone number
          <input
            type="tel"
            value={value.phone}
            onChange={(event) =>
              update(
                "phone",
                event.target.value
              )
            }
            autoComplete="tel"
            required
          />
        </label>

        <label>
          Email address
          <input
            type="email"
            value={value.email}
            onChange={(event) =>
              update(
                "email",
                event.target.value
              )
            }
            autoComplete="email"
          />
        </label>
      </div>
    </section>
  );
}