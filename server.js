require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const authRoute  = require('./routes/auth');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://igagandeep.github.io/Portfolio/']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌐 Portfolio API Running');
});

app.use('/api/login', authRoute);

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
