import { useNavigate } from "react-router-dom";

export default function CartButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="button button-primary"
      onClick={() => navigate("/cart")}
    >
      Cart
    </button>
  );
}