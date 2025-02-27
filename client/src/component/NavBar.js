import React from 'react';
import { Link } from 'react-router-dom';
import './win.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/delete-team">Delete Team</Link></li>
        <li><Link to="/stats">Stats</Link></li>
        <li><Link to="/average-goals">Average Goals</Link></li>
        <li><Link to="/add-team">Add Team</Link></li>
        <li><Link to="/win">Win</Link></li>
        <li><Link to="/update-team">Update Team</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
