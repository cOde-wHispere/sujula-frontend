import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSearch() {
    const value = query.trim();

    if (!value) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
      role="search"
    >
      <input
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <button
        type="submit"
        className="button button-primary"
        aria-label="Search products"
      >
        Search
      </button>
    </form>
  );
}