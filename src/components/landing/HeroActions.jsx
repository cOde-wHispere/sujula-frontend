import { useNavigate } from "react-router-dom";

export default function HeroActions() {
  const navigate = useNavigate();

  return (
    <div className="hero-actions">
      <button
        type="button"
        className="button button-primary"
        onClick={() => navigate("/explore")}
      >
        Start Shopping
      </button>

      <button
        type="button"
        className="button button-secondary"
        onClick={() => navigate("/promotions")}
      >
        View Promotions
      </button>
    </div>
  );
}