import CategoryCard from "../landing/cards/CategoryCard";

export default function CategoriesGrid({
  categories = [],
}) {
  const safeCategories = Array.isArray(categories)
    ? categories
    : [];

  return (
    <section
      className="categories-grid-section"
      aria-labelledby="categories-grid-heading"
    >
      <h2 id="categories-grid-heading">
        All Categories
      </h2>

      <div className="card-grid">
        {safeCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}