import { memo } from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  function handleCategoryClick() {
    if (!category?.name) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(category.name)}`
    );
  }

  return (
    <article className="category-card">
      <button
        type="button"
        className="category-card-button"
        onClick={handleCategoryClick}
        disabled={!category?.name}
        aria-label={`View products in ${
          category?.name || "category"
        }`}
      >
        {category?.image && (
          <img
            src={category.image}
            alt=""
            loading="lazy"
          />
        )}

        <h3>{category?.name}</h3>

        {category?.description && (
          <p>{category.description}</p>
        )}
      </button>
    </article>
  );
}

export default memo(CategoryCard);