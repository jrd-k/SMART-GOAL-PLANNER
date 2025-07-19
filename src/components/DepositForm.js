import React, { useState } from "react";

function DepositForm({ goals, onDeposit }) {
  const [goalId, setGoalId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onDeposit(goalId, Number(amount));
    setGoalId("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={goalId} onChange={(e) => setGoalId(e.target.value)} required>
        <option value="">Select a Goal</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input type="number" placeholder="Deposit Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default DepositForm;