import React from "react";
import GoalCard from "./GoalCard";

function GoalList({ goals, onDelete, onEdit, onDeposit }) {
  return (
    <div>
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onDelete={onDelete}
          onEdit={onEdit}
          onDeposit={onDeposit}
        />
      ))}
    </div>
  );
}

export default GoalList;