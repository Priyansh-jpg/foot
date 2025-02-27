import React, { useState } from 'react';
import axios from 'axios';
import './win.css';
const AverageGoals = () => {
    const [year, setYear] = useState('');
    const [teams, setTeams] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setTeams([]);
        setLoading(true);

        try {
            const response = await axios.get('http://localhost:3000/api/football/averageGoals', {
                params: { Year: year },
            });
            setTeams(response.data.data); // Set the teams data from the API response
            setMessage(response.data.message);
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'An error occurred while fetching the data.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="average-goals-container">
            <h2>Average Goals per Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Enter year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Get Average Goals'}
                </button>
            </form>

            {message && <p className="message">{message}</p>}

            {teams.length > 0 && (
                <div className="results">
                    <h3>Teams for Year {year}</h3>
                    {teams.map((team, index) => (
                        <div key={index} className="team">
                            <p><strong>Team:</strong> {team.Team}</p>
                            <p><strong>Year:</strong> {team.Year}</p>
                            <p><strong>Average Goals For:</strong> {team.averageGoalsFor.toFixed(2)}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AverageGoals;
