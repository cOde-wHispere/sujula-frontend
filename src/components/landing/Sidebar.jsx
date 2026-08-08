import SidebarCategoryItem from "./SidebarCategoryItem";

export default function Sidebar({
  categories = [],
  open = false,
  onClose,
}) {
  const categoryList = Array.isArray(categories)
    ? categories
    : [];

  return (
    <aside
      className={`sidebar ${
        open ? "sidebar-open" : ""
      }`}
      aria-label="Product categories"
    >
      <div className="sidebar-header">
        <h2>Categories</h2>

        {open && (
          <button
            type="button"
            className="button"
            onClick={onClose}
            aria-label="Close category menu"
          >
            ×
          </button>
        )}
      </div>

      <ul>
        {categoryList.length > 0 ? (
          categoryList.map((category) => (
            <SidebarCategoryItem
              key={category.id}
              category={category}
            />
          ))
        ) : (
          <li>
            No categories available.
          </li>
        )}
      </ul>
    </aside>
  );
}