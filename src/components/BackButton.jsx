import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="back-btn"
      onClick={() => navigate("/")}
    >
      ← Back
    </button>
  );
}

export default BackButton;