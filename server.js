const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌐 Portfolio API Running');
});

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
