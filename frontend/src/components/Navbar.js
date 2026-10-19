import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <div className="navbar">
      <h2>📋 Mini ATS System</h2>
      <div className="nav-buttons">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          Candidate List
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          + Add Candidate
        </button>
      </div>
    </div>
  );
}

export default Navbar;