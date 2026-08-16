import { memo } from "react";

function CartItem({
  item,
  onUpdate,
  onRemove,
}) {
  if (!item) {
    return null;
  }

  function decreaseQuantity() {
    onUpdate(
      item.productId,
      item.quantity - 1
    );
  }

  function increaseQuantity() {
    onUpdate(
      item.productId,
      item.quantity + 1
    );
  }

  function removeItem() {
    onRemove(item.productId);
  }

  return (
    <article className="cart-item">
      <div className="cart-item-image">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
          />
        ) : (
          <div
            className="cart-item-image-placeholder"
            aria-hidden="true"
          >
            Product
          </div>
        )}
      </div>

      <div className="cart-item-content">
        <h2>{item.name}</h2>

        <p className="cart-item-price">
          {item.unitPrice}
        </p>

        <div className="cart-item-controls">
          <button
            type="button"
            className="button button-secondary"
            onClick={
              decreaseQuantity
            }
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={
              item.quantity <= 1
            }
          >
            −
          </button>

          <span
            className="cart-item-quantity"
            aria-label={`Quantity ${item.quantity}`}
          >
            {item.quantity}
          </span>

          <button
            type="button"
            className="button button-secondary"
            onClick={
              increaseQuantity
            }
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="cart-item-remove"
          onClick={removeItem}
        >
          Remove
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span>Subtotal</span>
        <strong>
          {item.subtotal}
        </strong>
      </div>
    </article>
  );
}

export default memo(CartItem);