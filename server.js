const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./auth-jwt-project/config/db');
const authRoutes = require('./auth-jwt-project/routes/authRoutes');
const logAction = require('./auth-jwt-project/middleware/logMiddleware'); 

dotenv.config(); // Wczytuje zmienne środowiskowe z pliku .env
connectDB(); // Łączy się z MongoDB

const app = express();

app.use(express.json());

app.use('/api/auth', logAction, authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
