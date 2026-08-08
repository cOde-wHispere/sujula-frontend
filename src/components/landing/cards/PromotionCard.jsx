import { memo } from "react";
import { useNavigate } from "react-router-dom";

function PromotionCard({ promotion }) {
  const navigate = useNavigate();

  const promotionQuery =
    promotion?.title || promotion?.name;

  function handleShopNow() {
    if (!promotionQuery) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(
        promotionQuery
      )}`
    );
  }

  return (
    <article className="promotion-card">
      {promotion?.image && (
        <img
          src={promotion.image}
          alt=""
          loading="lazy"
        />
      )}

      <h3>{promotion?.title || promotion?.name}</h3>

      {promotion?.description && (
        <p>{promotion.description}</p>
      )}

      <button
        type="button"
        className="button button-primary"
        onClick={handleShopNow}
        disabled={!promotionQuery}
      >
        Shop Now
      </button>
    </article>
  );
}

export default memo(PromotionCard);