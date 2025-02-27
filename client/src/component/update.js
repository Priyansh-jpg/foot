import React, { useState } from 'react';
import axios from 'axios';
import './update.css';

const UpdateTeam = () => {
    const [teamData, setTeamData] = useState({
        Team: '',
        GamesPlayed: '',
        Win: '',
        Draw: '',
        Loss: '',
        GoalsFor: '',
        GoalsAgainst: '',
        Points: '',
        Year: ''
    });
    const [showData, setShowData] = useState(false);

    const handleChange = (e) => {
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/teams/update/${teamData.Team}`, teamData);
            alert(response.data.message || 'Team data updated successfully!');
            setShowData(true); // Show the updated data
        } catch (error) {
            console.error('Error updating team data:', error);
            alert('Failed to update team data. Please try again.');
        }
    };

    return (
        <div className="update-team-container">
        <div>
            
            <h1>Update Team </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Team"
                    placeholder="Team"
                    onChange={handleChange}
                    value={teamData.Team}
                    required
                />
                <input
                    type="number"
                    name="GamesPlayed"
                    placeholder="Games Played"
                    onChange={handleChange}
                    value={teamData.GamesPlayed}
                    required
                />
                <input
                    type="number"
                    name="Win"
                    placeholder="Wins"
                    onChange={handleChange}
                    value={teamData.Win}
                    required
                />
                <input
                    type="number"
                    name="Draw"
                    placeholder="Draws"
                    onChange={handleChange}
                    value={teamData.Draw}
                    required
                />
                <input
                    type="number"
                    name="Loss"
                    placeholder="Losses"
                    onChange={handleChange}
                    value={teamData.Loss}
                />
                <input
                    type="number"
                    name="GoalsFor"
                    placeholder="Goals For"
                    onChange={handleChange}
                    value={teamData.GoalsFor}
                />
                <input
                    type="number"
                    name="GoalsAgainst"
                    placeholder="Goals Against"
                    onChange={handleChange}
                    value={teamData.GoalsAgainst}
                />
                <input
                    type="number"
                    name="Points"
                    placeholder="Points"
                    onChange={handleChange}
                    value={teamData.Points}
                />
                <input
                    type="number"
                    name="Year"
                    placeholder="Year"
                    onChange={handleChange}
                    value={teamData.Year}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            {showData && (
                <div>
                     <h2>Updated Team Data</h2>
                    <p>Team: {teamData.Team}</p>
                    <p>Games Played: {teamData.GamesPlayed}</p>
                    <p>Wins: {teamData.Win}</p>
                    <p>Draws: {teamData.Draw}</p>
                    <p>Losses: {teamData.Loss}</p>
                    <p>Goals For: {teamData.GoalsFor}</p>
                    <p>Goals Against: {teamData.GoalsAgainst}</p>
                    <p>Points: {teamData.Points}</p>
                    <p>Year: {teamData.Year}</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default UpdateTeam;
