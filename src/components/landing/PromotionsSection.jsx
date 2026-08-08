import PromotionCard from "./cards/PromotionCard";

export default function PromotionsSection({
  promotions = [],
}) {
  const safePromotions = Array.isArray(promotions)
    ? promotions
    : [];

  return (
    <section id="promotions">
      <h2>Promotions</h2>

      <div className="card-grid">
        {safePromotions.length > 0 ? (
          safePromotions.map((promotion) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
            />
          ))
        ) : (
          <p>No promotions available.</p>
        )}
      </div>
    </section>
  );
}