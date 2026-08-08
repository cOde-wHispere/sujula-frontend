import { useState } from "react";
import { useRequestContext } from "../../context/RequestContext";
import DeliveryLocationModal from "./DeliveryLocationModal";

export default function DeliveryLocationBar() {
  const { deliveryAddress } =
    useRequestContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        className="delivery-location-bar"
        aria-label="Delivery destination"
      >
        <span>
          Delivering to:
        </span>

        <button
          type="button"
          className="button button-secondary"
          onClick={() => setOpen(true)}
          aria-label="Change delivery location"
        >
          {deliveryAddress ||
            "Choose delivery location"}
        </button>
      </section>

      <DeliveryLocationModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}