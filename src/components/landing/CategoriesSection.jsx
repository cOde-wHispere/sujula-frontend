import CategoryCard from "./cards/CategoryCard";

export default function CategoriesSection({
  categories = [],
}) {
  const safeCategories = Array.isArray(categories)
    ? categories
    : [];

  return (
    <section id="categories">
      <h2>Categories</h2>

      <div className="card-grid">
        {safeCategories.length > 0 ? (
          safeCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </section>
  );
}