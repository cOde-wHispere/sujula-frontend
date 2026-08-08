import { useEffect, useState } from "react";
import { useRequestContext } from "../../context/RequestContext";

export default function DeliveryLocationModal({
  open,
  onClose,
}) {
  const {
    deliveryAddress,
    deliveryLatitude,
    deliveryLongitude,
    setDeliveryLocation,
  } = useRequestContext();

  const [address, setAddress] = useState(
    deliveryAddress || ""
  );

  useEffect(() => {
    if (open) {
      setAddress(deliveryAddress || "");
    }
  }, [open, deliveryAddress]);

  if (!open) {
    return null;
  }

  function handleSave(event) {
    event.preventDefault();

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      return;
    }

    setDeliveryLocation({
      address: trimmedAddress,
      latitude: deliveryLatitude,
      longitude: deliveryLongitude,
    });

    onClose();
  }

  return (
    <div
      className="delivery-modal-overlay"
      role="presentation"
    >
      <div
        className="delivery-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delivery-modal-title"
      >
        <h2 id="delivery-modal-title">
          Delivery Location
        </h2>

        <form onSubmit={handleSave}>
          <label htmlFor="delivery-address">
            Delivery address
          </label>

          <input
            id="delivery-address"
            type="text"
            placeholder="Enter delivery address"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            autoFocus
          />

          <p className="delivery-location-note">
            Your selected address will be used as
            your delivery destination.
          </p>

          <div className="delivery-modal-actions">
            <button
              type="submit"
              className="button button-primary"
              disabled={!address.trim()}
            >
              Save Location
            </button>

            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}