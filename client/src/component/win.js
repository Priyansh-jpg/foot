import React, { useState } from 'react';
import axios from 'axios';
import './win.css';


const Win = () => {
    const [Win, setWin] = useState('');
    const [totals, setTotals] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setTotals(null);

        try {
            const response = await axios.get('http://localhost:3000/api/football/teams', {
                params: { Win: Win },
            });
            setTotals(response.data.data); // Access the correct property
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error fetching data.');
        }
    };

    return (
        <div className="totals-container">
            <h2>Total Wins More Than</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Win">Win:</label>
                    <input
                        type="number"
                        id="Win"
                        name="Win"
                        placeholder="Enter Win"
                        value={Win}
                        onChange={(e) => setWin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Get Teams</button>
            </form>

            {message && <p className="message error">{message}</p>}

            {totals && (
                <div className="results">
                    <h3>Teams with Wins Greater Than {Win}</h3>
                    {totals.map((team, index) => (
                        <div key={index}>
                            <p><strong>Team:</strong> {team.Team}</p>
                            <p><strong>Draws:</strong> {team.Draw}</p>
                            <p><strong>Wins:</strong> {team.Win}</p>
                            <p><strong>Games Played:</strong> {team.GamesPlayed}</p>
                            <p><strong>Loss:</strong> {team.Loss}</p>
                            <p><strong>Goals For:</strong> {team.GoalsFor}</p>
                            <p><strong>Goals Against:</strong> {team.GoalsAgainst}</p>
                            <p><strong>Points:</strong> {team.Points}</p>
                            <p><strong>Year:</strong> {team.Year}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Win;