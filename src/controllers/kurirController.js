const e = require('express');
const {db, firebase} = require('../config/firebaseConfig');
const dotenv = require('dotenv');

dotenv.config();

exports.addKurir = async (req, res) => {
    try {
        const { nama, email, no_telepon, password } = req.body;

        // Validasi sederhana (opsional tapi bagus untuk mencegah data kosong)
        if (!nama || !email || !no_telepon || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newKurir = await db.collection('kurir').add({
            nama,
            email,
            no_telepon,
            password 
        });

        res.status(201).json({ id: newKurir.id, message: "Kurir added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getKurir = async (req, res) => {
    try {
        const snapshot = await db.collection('kurir').get();
        const kurir = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        res.status(200).json(kurir);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.updateKurir = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;

        await db.collection('kurir').doc(id).update(data);
        res.status(200).json({message: 'Kurir updated successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.deleteKurir = async (req, res) => {
    try {
        const {id} = req.params;

        await db.collection('kurir').doc(id).delete();
        res.status(200).json({message: 'Kurir deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

