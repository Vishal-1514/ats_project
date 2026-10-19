import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CandidateList from './components/CandidateList';
import AddCandidate from './components/AddCandidate';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [candidates, setCandidates] = useState([]);

  // Fetch candidates from Backend API
  const fetchCandidates = async () => {
    try {
      const response = await fetch('https://ats-project-wfwm.onrender.com/api/candidates');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'dashboard' && <Dashboard candidates={candidates} />}
      {activeTab === 'list' && (
        <CandidateList candidates={candidates} fetchCandidates={fetchCandidates} />
      )}
      {activeTab === 'add' && (
        <AddCandidate fetchCandidates={fetchCandidates} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}

export default App;