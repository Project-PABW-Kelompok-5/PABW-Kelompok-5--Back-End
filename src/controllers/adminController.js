// controllers/adminController.js
const { db } = require('../config/firebaseConfig');

// Tambah pengguna oleh Admin
const bcrypt = require('bcryptjs');
const { getAuth } = require('firebase-admin/auth');

exports.addUser = async (req, res) => {
    try {
      const { uid, username, email, no_telepon, role } = req.body;
  
      if (!uid || !username || !email || !role) {
        return res.status(400).json({ message: "Field tidak boleh kosong" });
      }
  
      // Cek apakah user dengan email tersebut sudah ada
      const userSnapshot = await db.collection('users').where('email', '==', email).get();
      if (!userSnapshot.empty) {
        return res.status(400).json({ message: "Email sudah digunakan" });
      }
  
      // Data user yang akan disimpan di Firestore
      const newUser = {
        uid,
        username,
        email,
        no_telepon: no_telepon || '',
        role,
        tanggal_registrasi: new Date(),
        saldo: 0,
      };
  
      // Simpan user dengan UID sebagai document id
      await db.collection('users').doc(uid).set(newUser);
  
      res.status(201).json({ id: uid, message: "User berhasil ditambahkan oleh admin" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// GET: Semua pengguna
exports.getAllUsers = async (req, res) => {
    try {
      const snapshot = await db.collection("users").get();
      const users = [];
  
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json({ users }); // pastikan bentuknya { users: [...] }
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil data pengguna", error: error.message });
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
    const { id } = req.params;
    const { username, password, name, no_telepon, role } = req.body;
  
    try {
      const userRef = db.collection("users").doc(id);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      // Cegah perubahan email
      if (req.body.email && req.body.email !== userDoc.data().email) {
        return res.status(400).json({ message: "Email tidak bisa diubah" });
      }
  
      // Update password jika dikirim
      if (password) {
        await getAuth().updateUser(id, { password });
      }
  
      await userRef.update({
        username,
        name,
        no_telepon,
        role,
      });
  
      res.json({ message: "User berhasil diperbarui" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// DELETE: Hapus pengguna
const admin = require('firebase-admin');

exports.deleteUser = async (req, res) => {
  const userId = req.params.id; // ini harus UID Firebase

  try {
    // 1. Hapus user di Firebase Auth
    await admin.auth().deleteUser(userId);

    // 2. Hapus data user di Firestore atau database lain
    await db.collection('users').doc(userId).delete();

    res.status(200).json({ message: 'User berhasil dihapus' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Gagal menghapus pengguna', error: error.message });
  }
};


// PATCH /api/admin/users/:id/saldo
exports.updateSaldo = async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body; // bisa + atau -
  
      const userRef = db.collection("users").doc(id);
      const doc = await userRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const currentSaldo = doc.data().saldo || 0;
      const newSaldo = currentSaldo + amount;
  
      await userRef.update({ saldo: newSaldo });
      res.status(200).json({ message: "Saldo updated", newSaldo });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  