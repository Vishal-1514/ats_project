import React, { useState } from 'react';

function AddCandidate({ fetchCandidates, setActiveTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experience: '',
    stage: 'Applied'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://ats-project-wfwm.onrender.com/api/candidates', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
      fetchCandidates();
      setActiveTab('list'); // Redirect to candidate list
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div>
      <h3>Add New Candidate</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            required
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Job Role:</label>
          <input
            type="text"
            name="role"
            required
            placeholder="e.g. React Developer"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Experience:</label>
          <input
            type="text"
            name="experience"
            placeholder="e.g. 2 years"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Pipeline Stage:</label>
          <select name="stage" value={formData.stage} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default AddCandidate;