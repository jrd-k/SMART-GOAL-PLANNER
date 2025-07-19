import React, { useState, useEffect } from "react";

function GoalForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", targetAmount: "", category: "", deadline: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Goal Name" value={formData.name} onChange={handleChange} required />
      <input name="targetAmount" type="number" placeholder="Target Amount" value={formData.targetAmount} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      <button type="submit">{initialData ? "Update Goal" : "Add Goal"}</button>
    </form>
  );
}

export default GoalForm;