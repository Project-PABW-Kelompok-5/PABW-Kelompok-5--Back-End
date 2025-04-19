const { db } = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

// Tambah Kategori
exports.tambahKategori = async (req, res) => {
  try {
    const id_kategori = uuidv4();
    const { nama_kategori, deskripsi_kategori } = req.body;

    await db.collection('kategori').doc(id_kategori).set({
      id_kategori,
      nama_kategori,
      deskripsi_kategori
    });

    res.status(201).json({ message: 'Kategori berhasil ditambahkan', id_kategori });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil semua kategori
exports.getSemuaKategori = async (req, res) => {
  try {
    const snapshot = await db.collection('kategori').get();
    const kategori = snapshot.docs.map(doc => doc.data());
    res.status(200).json(kategori);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Kategori
exports.editKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await db.collection('kategori').doc(id).update(data);
    res.status(200).json({ message: 'Kategori berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hapus Kategori
exports.hapusKategori = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('kategori').doc(id).delete();
    res.status(200).json({ message: 'Kategori berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
