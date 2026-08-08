import { useNavigate } from "react-router-dom";

const MARKETPLACE_NAME =
  process.env.REACT_APP_MARKETPLACE_NAME || "Marketplace";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="logo"
      onClick={() => navigate("/")}
      aria-label={`Go to ${MARKETPLACE_NAME} home`}
    >
      {MARKETPLACE_NAME}
    </button>
  );
}