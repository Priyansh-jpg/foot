import React, { useState } from 'react';
import axios from 'axios';
import './win.css';
 
 const DeleteTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');
 
  const handleChange = (e) => {
    setTeamName(e.target.value);
  };
 
  const handleDelete = async (e) => {
    e.preventDefault();
 
    if (!teamName) {
      setMessage({ text: 'Please enter a team name.', type: 'error' });
      return;
    }
 
    try {
      const response = await axios.delete(`http://localhost:3000/teams/delete/${teamName}`);
      setMessage({ text: response.data.message, type: 'success' });
      setTeamName(''); // Clear the input field
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Error deleting team. Please try again.',
        type: 'error',
      });
    }
  };
 
  return (
    <div className="delete-team-container">
      <h2>Delete Team Records</h2>
      <form onSubmit={handleDelete}>
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            placeholder="Enter team name"
            value={teamName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="delete-button">
          Delete Team
        </button>
      </form>
      {message.text && (
        <p className={`message ${message.type === 'error' ? 'error' : 'success'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};
export default DeleteTeam