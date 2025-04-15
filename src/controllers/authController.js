const { db, firebase } = require('../config/firebaseConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register Pengguna
exports.register = async (req, res) => {
    try {
        const { username, email, password, no_telepon } = req.body;

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan pengguna di Firestore
        const newUser = await db.collection('users').add({
            username,
            email,
            password: hashedPassword,
            no_telepon,
            tanggal_registrasi: new Date()
        });

        res.status(201).json({ id: newUser.id, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login Pengguna
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari pengguna berdasarkan email
        const userSnapshot = await db.collection('users').where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(404).json({ message: "User not found" });
        }

        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();

        // Cek password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Buat token JWT
        const token = jwt.sign({ id: userDoc.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: userDoc.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
