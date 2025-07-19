import React, { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import AddGoalForm from "./components/AddGoalForm";
import DepositForm from "./components/DepositForm";
import DashboardOverview from "./components/DashboardOverview";

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals on mount
  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Failed to fetch goals", err));
  }, []);

  // Add new goal
  function handleAddGoal(newGoal) {
    setGoals([...goals, newGoal]);
  }

  // Update a goal (including deposits)
  function handleUpdateGoal(updatedGoal) {
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  }

  // Delete a goal
  function handleDeleteGoal(goalId) {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(updatedGoals);
  }

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <DashboardOverview goals={goals} />
      <AddGoalForm onAddGoal={handleAddGoal} />
      <DepositForm goals={goals} onUpdateGoal={handleUpdateGoal} />
      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
}

export default App;
