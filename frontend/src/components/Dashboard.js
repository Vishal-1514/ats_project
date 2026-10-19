import React from 'react';

function Dashboard({ candidates }) {
  const total = candidates.length;
  const stages = ['Applied', 'Interview', 'Offer', 'Hired', 'Rejected'];

  const getCount = (stage) => candidates.filter(c => c.stage === stage).length;

  return (
    <div>
      <h3>Dashboard Overview</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Applicants</h4>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h4>In Interview</h4>
          <p>{getCount('Interview')}</p>
        </div>
        <div className="stat-card">
          <h4>Hired</h4>
          <p>{getCount('Hired')}</p>
        </div>
        <div className="stat-card">
          <h4>Rejected</h4>
          <p>{getCount('Rejected')}</p>
        </div>
      </div>

      <h4>Candidate Pipeline Breakdown</h4>
      {stages.map((stage) => {
        const count = getCount(stage);
        return (
          <div key={stage} className="stage-bar">
            <div className="stage-info">
              <span><strong>{stage}</strong></span>
              <span>{count} Candidate(s)</span>
            </div>
            <progress value={count} max={total || 1}></progress>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;