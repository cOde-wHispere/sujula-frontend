import { memo } from "react";
import { useNavigate } from "react-router-dom";

function SidebarCategoryItem({ category }) {
  const navigate = useNavigate();

  function handleClick() {
    if (!category?.name) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(category.name)}`
    );
  }

  return (
    <li>
      <button
        type="button"
        className="sidebar-category-item"
        onClick={handleClick}
        disabled={!category?.name}
      >
        {category?.name || "Category"}
      </button>
    </li>
  );
}

export default memo(SidebarCategoryItem);