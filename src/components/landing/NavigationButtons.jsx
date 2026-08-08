import { useNavigate } from "react-router-dom";

export default function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <nav
      className="navigation-buttons"
      aria-label="Marketplace links"
    >
      <button
        type="button"
        className="button button-secondary"
        onClick={() => navigate("/search")}
      >
        Explore
      </button>

      <button
        type="button"
        className="button button-secondary"
        onClick={() => navigate("/")}
      >
        Promotions
      </button>
    </nav>
  );
}