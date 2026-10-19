import React, { useState } from 'react';

function CandidateList({ candidates, fetchCandidates }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle stage change via dropdown
  const handleStageChange = async (id, newStage) => {
    try {
      await fetch(`https://ats-project-wfwm.onrender.com/api/candidates/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ stage: newStage })
});
      fetchCandidates();
    } catch (error) {
      console.error("Error updating stage:", error);
    }
  };

  // Handle candidate deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await fetch(`https://ats-project-wfwm.onrender.com/api/candidates/${id}`, {
  method: 'DELETE'
});
        fetchCandidates();
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
  };

  // Filter candidates by search input
  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>All Candidates</h3>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by candidate name or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Current Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.role}</td>
                <td>{c.experience}</td>
                <td>
                  <select
                    value={c.stage}
                    onChange={(e) => handleStageChange(c.id, e.target.value)}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No candidates found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateList;
