import React from "react";

function GoalCard({ goal, onDelete, onEdit }) {
  const percent = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const deadline = new Date(goal.deadline);
  const now = new Date();
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

  const isComplete = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysLeft < 0 && !isComplete;
  const isWarning = daysLeft <= 30 && daysLeft > 0 && !isComplete;

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Saved: ${goal.savedAmount} / ${goal.targetAmount}</p>
      <div className="progress-bar">
        <div style={{ width: `${percent}%`, background: "green", height: "10px" }}></div>
      </div>
      <p>{remaining > 0 ? `$${remaining} remaining` : "✅ Goal Complete!"}</p>
      <p>Deadline: {goal.deadline}</p>
      {isWarning && <p style={{ color: "orange" }}>⚠️ {daysLeft} days left</p>}
      {isOverdue && <p style={{ color: "red" }}>❗ Overdue</p>}
      <button onClick={() => onEdit(goal)}>Edit</button>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
}

export default GoalCard;

