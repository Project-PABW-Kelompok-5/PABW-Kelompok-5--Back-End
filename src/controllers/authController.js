const { db, firebase } = require('../config/firebaseConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    try {
        const { username, email, no_telepon, uid } = req.body;

        const userRole = 'user';

        const newUser = await db.collection('users').doc(uid).set({
            username,
            email,
            no_telepon,
            role: userRole,
            tanggal_registrasi: new Date()
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getUserInfo = async (req, res) => {
    try {
        // Ambil UID dari token yang sudah diverifikasi di middleware
        const userDoc = await db.collection('users').doc(req.user.uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: "User not found in Firestore" });
        }

        const user = userDoc.data();
        res.json({
            id: req.user.uid,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};