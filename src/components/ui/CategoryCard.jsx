import { memo } from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  function handleOpenCategory() {
    navigate(`/categories/${category.id}`);
  }

  return (
    <article className="category-card">

      <h3>{category.name}</h3>

      {category.description && (
        <p>{category.description}</p>
      )}

      <button
        type="button"
        className="button button-secondary"
        onClick={handleOpenCategory}
      >
        View Category
      </button>

    </article>
  );
}

export default memo(CategoryCard);