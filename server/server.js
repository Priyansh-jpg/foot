const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Import MongoDB connection function
const football = require('./dbconnect/db');
// Import data model
const data = require('./product/model');

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Load environment variables
dotenv.config();

// MongoDB Connection
football(); // Ensure this connects MongoDB when the server starts

// Serve static files (React app build folder)
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// API Routes
const path = require('path');  // Make sure to import path if you haven't

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Catch-all handler for React Router (for SPAs)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// Get all teams data
app.get('/alldata', async (req, res) => {
  try {
    const Database = await data.find({});
    res.status(200).json(Database);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a team by name
app.get('/teams/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const Team = await data.findOne({ Team: new RegExp(`^${name}$`, 'i') });
    if (!Team) return res.status(404).json({ message: 'Team not found.' });
    res.status(200).json(Team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update team data
app.post('/updateTeam', async (req, res) => {
  const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;
  if (!Team) return res.status(400).json({ message: 'Team name is required.' });

  try {
    const updatedTeam = await data.findOneAndUpdate(
      { Team: new RegExp(Team, 'i') },
      { GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year },
      { new: true, runValidators: true }
    );
    if (!updatedTeam) return res.status(404).json({ message: `Team '${Team}' not found.` });

    res.status(200).json({ message: 'Team updated successfully!', updatedTeam });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team', error: error.message });
  }
});

// Delete a team by name
app.delete('/teams/delete/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const deletedTeam = await data.findOneAndDelete({ Team: new RegExp(`^${name}$`, 'i') });
    if (!deletedTeam) return res.status(404).json({ message: 'Team not found. Deletion failed.' });

    res.status(200).json({ message: `Team '${deletedTeam.Team}' deleted successfully.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Filter teams based on wins greater than a specific value
app.get('/Win', async (req, res) => {
  const { Win } = req.query;
  if (!Win || isNaN(Win)) return res.status(400).json({ message: 'Please provide a valid "Win" value.' });

  try {
    const teams = await data.find({ Win: { $gt: Number(Win) } })
      .limit(10)
      .select('Team GamesPlayed Draw Win Loss GoalsFor GoalsAgainst Points Year');

    if (!teams.length) return res.status(404).json({ message: `No teams found with wins greater than ${Win}.` });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving records', error: error.message });
  }
});

// Filter teams by goals for a specific year
app.get('/teams-by-goals', async (req, res) => {
  const { Year, GoalsFor } = req.query;
  if (!Year || !GoalsFor || isNaN(GoalsFor)) return res.status(400).json({ message: 'Provide valid Year and GoalsFor.' });

  try {
    const teams = await data.find({ Year: Number(Year), GoalsFor: { $gte: Number(GoalsFor) } })
      .select('Team GamesPlayed Win Draw Loss GoalsFor GoalsAgainst Points Year');

    if (!teams.length) return res.status(404).json({ message: `No teams found for year ${Year} with goals ≥ ${GoalsFor}.` });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving teams.', error: error.message });
  }
});

// Aggregate total stats for a given year
app.get('/totalsforYear', async (req, res) => {
  const { Year } = req.query;
  if (!Year || isNaN(Year)) return res.status(400).json({ message: 'Provide a valid year.' });

  try {
    const totals = await data.aggregate([
      { $match: { Year: Number(Year) } },
      {
        $group: {
          _id: null,
          totalGamesPlayed: { $sum: '$GamesPlayed' },
          totalDraw: { $sum: '$Draw' },
          totalWins: { $sum: '$Win' },
        },
      },
    ]);

    if (!totals.length) return res.status(404).json({ message: `No data found for ${Year}.` });

    res.status(200).json(totals[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving totals.', error: error.message });
  }
});

// Add new team data
app.post('/addteamdata', async (req, res) => {
  const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;
  if (!Team || !GamesPlayed || !Win || !Draw || !Loss || !GoalsFor || !GoalsAgainst || !Points || !Year) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  try {
    const newTeam = new data({ Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year });
    await newTeam.save();
    res.status(201).json({ success: true, product: newTeam });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Home route
app.get('/', (req, res) => res.send('Hello World!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
