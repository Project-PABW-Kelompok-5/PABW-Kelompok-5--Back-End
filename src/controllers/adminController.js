// controllers/adminController.js
const { db } = require('../config/firebaseConfig');

// Tambah pengguna oleh Admin
const bcrypt = require('bcryptjs');

exports.addUser = async (req, res) => {
    try {
        const { username, email, password, no_telepon, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "Field tidak boleh kosong" });
        }

        const userSnapshot = await db.collection('users').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            return res.status(400).json({ message: "Email sudah digunakan" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            no_telepon: no_telepon || '',
            role, // 'admin', 'kurir', atau 'pengguna'
            tanggal_registrasi: new Date(),
            saldo: 0
        };

        const userRef = await db.collection('users').add(newUser);

        res.status(201).json({ id: userRef.id, message: "User berhasil ditambahkan oleh admin" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET: Semua pengguna
exports.getAllUsers = async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET: Detail pengguna
exports.getUserById = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const doc = await userRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT: Update pengguna
exports.updateUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        await userRef.update(req.body);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE: Hapus pengguna
exports.deleteUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        await userRef.delete();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
