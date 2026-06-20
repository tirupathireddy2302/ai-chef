function MealPlanCards({ mealPlan }) {

  const days =
    mealPlan.split("📅");

  return (

    <div className="meal-cards">

      {days
        .filter(day =>
          day.trim()
        )
        .map(
          (day, index) => (

            <div
              key={index}
              className="meal-day-card"
            >

              <pre>
                {"📅 " + day}
              </pre>

            </div>

          )
        )}

    </div>

  );
}

export default MealPlanCards;