const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const football = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Football2005', // ✅ Explicitly set database name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.db.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};


   
  module.exports = football;