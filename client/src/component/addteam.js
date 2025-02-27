
import React, { useState } from 'react';
import axios from 'axios';
import './add.css';
const AddTeam = () => {
    const [teamData, setTeamData] = useState({
       
        "Team": '',
       "GamesPlayed" : '',
       "Win" : '',
        "Draw": '',
        "Loss": '',
        "GoalsFor": '',
        "GoalsAgainst": '',
        "Points": '',
       " Year": ''
    });

    const handleChange = (e) => {
        
        setTeamData({ ...teamData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/addteamdata', teamData);
            alert(response.data.message || 'Team data added successfully!');
            setTeamData({
             
            });
        } catch (error) {
            console.error('Error adding team data:', error);
            alert('Failed to add team data. Please try again.');
        }
    };

   

    return (
<div className="add-team-container">
<h1>Add Team</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="Text"
                name="Team"
                placeholder="Team"
                onChange={handleChange}
                value={teamData.Team}
                required
            />

            <input
                type="Number"
                name="GamesPlayed"
                placeholder="GamesPlayed"
                onChange={handleChange}
                value={teamData.GamesPlayed}
                required
            />
            <input
                type="Number"
                name="Win"
                placeholder="Wins"
                onChange={handleChange}
                value={teamData.Win}
                required
            />
            <input
                type="Number"
                name="Draw"
                placeholder="Draws"
                onChange={handleChange}
                value={teamData.Draw}
                required
            />
            <input
                type="Number"
                name="Loss"
                placeholder="Losses"
                onChange={handleChange}
                value={teamData.Loss}
            />
            <input
                type="Number"
                name="GoalsFor"
                placeholder="GoalsFor"
                onChange={handleChange}
                value={teamData.GoalsFor}
            />
            <input
                type="Number"
                name="GoalsAgainst"
                placeholder="GoalsAgainst"
                onChange={handleChange}
                value={teamData.GoalsAgainst}
            />
            <input
                type="Number"
                name="Points"
                placeholder="Points"
                onChange={handleChange}
                value={teamData.Points}
            />
            <input
                type="Number"
                name="Year"
                placeholder="Year"
                onChange={handleChange}
                value={teamData.Year}
                required
            />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
};

export default AddTeam;