const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🌐 Portfolio API Running');
});

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
