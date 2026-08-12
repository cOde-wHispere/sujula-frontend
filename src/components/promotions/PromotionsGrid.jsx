import PromotionCard from "../landing/cards/PromotionCard";

export default function PromotionsGrid({
  promotions = [],
}) {
  const safePromotions = Array.isArray(
    promotions
  )
    ? promotions
    : [];

  return (
    <section
      className="promotions-grid-section"
      aria-label="Marketplace promotions"
    >
      <div className="card-grid">
        {safePromotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
          />
        ))}
      </div>
    </section>
  );
}