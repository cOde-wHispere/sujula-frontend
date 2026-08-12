export default function CategoriesEmptyState() {
  return (
    <section
      className="categories-empty-state"
      aria-live="polite"
    >
      <h2>No Categories Available</h2>

      <p>
        There are no marketplace categories available
        at the moment.
      </p>
    </section>
  );
}