export default function ExploreEmptyState() {
  return (
    <section
      className="empty-state"
      aria-live="polite"
    >
      <h2>No products available</h2>

      <p>
        There are no products available to
        explore right now.
      </p>
    </section>
  );
}