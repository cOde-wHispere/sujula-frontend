export default function PromotionEmptyState() {
  return (
    <section
      className="empty-state"
      aria-live="polite"
    >
      <h2>No promotions available</h2>

      <p>
        There are no active promotions available
        at the moment. Please check again later.
      </p>
    </section>
  );
}