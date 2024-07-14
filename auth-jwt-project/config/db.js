const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Wczytuje zmienne środowiskowe z pliku .env

console.log('MONGO_URI:', process.env.MONGO_URI); // Sprawdzi wartość MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
