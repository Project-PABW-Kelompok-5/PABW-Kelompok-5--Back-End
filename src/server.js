const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {auth, db} = require('../src/config/db');
const authRoutes = require('../src/routes/authRoutes');
const barangRoutes = require('../src/routes/barangRoutes');
const kategoriRoutes = require('../src/routes/kategoriRoutes');
const kurirRoutes = require('./routes/kurirRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Middleware untuk mengautentikasi token
app.use('/api/auth', authRoutes);
// CRUD barang
app.use('/api/barang', barangRoutes);
// CRUD kategori
app.use('/api/kategori', kategoriRoutes);
// CRUD kurir
app.use('/api/kurir', kurirRoutes);
// admin
app.use('/api/admin', adminRoutes);

// Cek apakah server berjalan
app.get('/', (req, res) => {
    res.send('Backend E-commerce API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

