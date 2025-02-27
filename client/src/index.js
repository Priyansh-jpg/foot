import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import AddTeam from './component/addteam.js';
import UpdateTeam from './component/update.js';
import DeleteTeam from './component/delete.js';
import Stats from './component/stats.js';
import Win from './component/win.js';
import AverageGoals from './component/averagegoals.js';
import NavBar from './component/NavBar.js'; // Import your NavBar component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      {/* Include NavBar so it's visible on every page */}
      <NavBar />
      <Routes>
        <Route path="/" element={<AddTeam />} /> {/* Default route */}
        <Route path="/add-team" element={<AddTeam />} />
        <Route path="/update-team" element={<UpdateTeam />} />
        <Route path="/delete-team" element={<DeleteTeam />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/win" element={<Win />} />
        <Route path="/average-goals" element={<AverageGoals />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
