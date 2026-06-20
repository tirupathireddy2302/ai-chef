import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

function IndianRecipeDetails() {
  const { name } = useParams();

  return (
    <div style={{ padding: "30px" }}>
      <BackButton />

      <h1>{name}</h1>

      <h2>
        Indian Recipe Details Page ✅
      </h2>
    </div>
  );
}

export default IndianRecipeDetails;