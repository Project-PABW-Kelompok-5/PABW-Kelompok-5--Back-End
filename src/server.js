const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {auth, db} = require('../src/config/db');
const authRoutes = require('../src/routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRoutes);

// Cek apakah server berjalan
app.get('/', (req, res) => {
    res.send('Backend E-commerce API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

