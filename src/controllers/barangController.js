const { db } = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

// Tambah Barang
exports.tambahBarang = async (req, res) => {
  try {
    const id_barang = uuidv4();
    const {
      id_user,
      nama_barang,
      deskripsi,
      harga,
      stok,
      id_kategori
    } = req.body;

    await db.collection('barang').doc(id_barang).set({
      id_barang,
      id_user,
      nama_barang,
      deskripsi,
      harga,
      stok,
      id_kategori
    });

    res.status(201).json({ message: 'Barang berhasil ditambahkan', id_barang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil semua barang
exports.getSemuaBarang = async (req, res) => {
  try {
    const snapshot = await db.collection('barang').get();
    const barang = snapshot.docs.map(doc => doc.data());
    res.status(200).json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit barang
exports.editBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await db.collection('barang').doc(id).update(data);
    res.status(200).json({ message: 'Barang berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hapus barang
exports.hapusBarang = async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('barang').doc(id).delete();
    res.status(200).json({ message: 'Barang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
