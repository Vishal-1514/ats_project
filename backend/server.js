const express = require('express');
const cors = require('cors');

const app = express();
// Use process.env.PORT provided by Render, fallback to 5000 locally
const PORT = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// In-Memory Candidate Database
let candidates = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "Frontend Developer", stage: "Interview", experience: "2 years" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", role: "Backend Developer", stage: "Applied", experience: "1 year" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", role: "UI/UX Designer", stage: "Hired", experience: "4 years" },
  { id: 4, name: "Sneha Patel", email: "sneha@example.com", role: "QA Engineer", stage: "Rejected", experience: "3 years" },
  { id: 5, name: "Vikram Verma", email: "vikram@example.com", role: "DevOps Engineer", stage: "Offer", experience: "5 years" }
];

// --- ROUTES ---

app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.post('/api/candidates', (req, res) => {
  const { name, email, role, stage, experience } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: "Name, email, and role are required." });
  }

  const newCandidate = {
    id: Date.now(),
    name,
    email,
    role,
    stage: stage || 'Applied',
    experience: experience || '0 years'
  };

  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

app.put('/api/candidates/:id', (req, res) => {
  const candidateId = parseInt(req.params.id);
  const { stage } = req.body;

  const candidate = candidates.find(c => c.id === candidateId);
  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found." });
  }

  if (stage) candidate.stage = stage;
  res.json(candidate);
});

app.delete('/api/candidates/:id', (req, res) => {
  const candidateId = parseInt(req.params.id);
  candidates = candidates.filter(c => c.id !== candidateId);
  res.json({ message: "Candidate deleted successfully.", id: candidateId });
});

// Bind to 0.0.0.0 for cloud platform compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});