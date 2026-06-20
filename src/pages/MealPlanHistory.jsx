import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import BackButton from "../components/BackButton";
import "../styles/MealPlanHistory.css";

import {
  getMealPlans,
  deleteMealPlan
} from "../services/mealPlanService";

import { useAuth } from "../context/AuthContext";

function MealPlanHistory() {

  const { user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] =
    useState(null);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    if (!user) return;

    const loadPlans = async () => {

      try {

        const data =
          await getMealPlans(
            user.uid
          );

        setPlans(data);

      } catch (error) {

        console.error(error);

      }

    };

    loadPlans();

  }, [user]);

  const deletePlan =
    async (id) => {

      try {

        await deleteMealPlan(
          user.uid,
          id
        );

        setPlans(
          prev =>
            prev.filter(
              plan =>
                plan.id !== id
            )
        );

      } catch (error) {

        console.error(error);

      }

    };

  const downloadHistoryPDF =
    (plan) => {

      const doc =
        new jsPDF();

      doc.setFontSize(18);

      doc.text(
        `Meal Plan - ${plan.diet}`,
        10,
        15
      );

      const lines =
        doc.splitTextToSize(
          plan.plan,
          180
        );

      doc.text(
        lines,
        10,
        30
      );

      doc.save(
        `${plan.diet}-meal-plan.pdf`
      );

    };

  const filteredPlans =
    plans.filter(
      plan =>
        plan.diet
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="history-page">

      <BackButton />

      <h1>
        📜 Meal Plan History
      </h1>

      <input
        type="text"
        placeholder="Search Plans..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="search-input"
      />

      {!user ? (

        <div className="empty-history">

          <h2>
            Please Login
          </h2>

          <p>
            Login to view your
            saved meal plans.
          </p>

        </div>

      ) : filteredPlans.length === 0 ? (

        <div className="empty-history">

          <h2>
            No Saved Plans
          </h2>

          <p>
            Generate and save
            meal plans first.
          </p>

        </div>

      ) : (

        <div className="history-list">

          {filteredPlans.map(
            (plan) => (

              <div
                key={plan.id}
                className="history-card"
              >

                <h3>
                  🍽 {plan.diet}
                </h3>

                <p>
                  💰 Budget:
                  ₹{plan.budget}
                </p>

                <p>
                  📅 Days:
                  {plan.days}
                </p>

                <p>
                  🕒 {
                    plan.createdAt
                  }
                </p>

                <div className="history-actions">

                  <button
                    className="view-btn"
                    onClick={() =>
                      setSelectedPlan(
                        plan
                      )
                    }
                  >
                    👁 View
                  </button>

                  <button
                    className="pdf-btn"
                    onClick={() =>
                      downloadHistoryPDF(
                        plan
                      )
                    }
                  >
                    📄 PDF
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deletePlan(
                        plan.id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

      {selectedPlan && (

        <div className="modal-overlay">

          <div className="modal-content">

            <button
              className="close-modal"
              onClick={() =>
                setSelectedPlan(
                  null
                )
              }
            >
              ✖
            </button>

            <h2>
              🍽 {
                selectedPlan.diet
              }
            </h2>

            <div className="meal-plan-view">

              <pre>
                {
                  selectedPlan.plan
                }
              </pre>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

export default MealPlanHistory;