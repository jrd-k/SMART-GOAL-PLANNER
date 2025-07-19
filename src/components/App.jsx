import React, { useEffect, useState } from "react";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import DepositForm from "./DepositForm";
import Overview from "./Overview";

const API = "http://localhost:3000/goals";

function App() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setGoals);
  }, []);

  function addGoal(goal) {
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...goal, savedAmount: 0, createdAt: new Date().toISOString() }),
    })
      .then(res => res.json())
      .then(newGoal => setGoals([...goals, newGoal]));
  }

  function updateGoal(id, updates) {
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then(res => res.json())
      .then(updatedGoal => {
        setGoals(goals.map(goal => (goal.id === id ? updatedGoal : goal)));
        setEditingGoal(null);
      });
  }

  function deleteGoal(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => setGoals(goals.filter(goal => goal.id !== id)));
  }

  function handleDeposit(id, amount) {
    const goal = goals.find(g => g.id === id);
    const newAmount = goal.savedAmount + amount;
    updateGoal(id, { savedAmount: newAmount });
  }

  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <GoalForm onSubmit={addGoal} />
      {editingGoal && (
        <GoalForm
          onSubmit={data => updateGoal(editingGoal.id, data)}
          initialData={editingGoal}
        />
      )}
      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <GoalList
        goals={goals}
        onDelete={deleteGoal}
        onEdit={setEditingGoal}
        onDeposit={handleDeposit}
      />
    </div>
  );
}

export default App;
