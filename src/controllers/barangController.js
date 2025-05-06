const { db } = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

// Tambah Barang
exports.tambahBarang = async (req, res) => {
  try {
    const id_barang = uuidv4();
    
    // Ambil id_user dari token yang sudah diverifikasi di middleware
    const id_user = req.user.id;

    const {
      nama_barang,
      deskripsi,
      harga,
      stok,
      id_kategori
    } = req.body;

    const status_stock = stok > 0 ? 'stok tersedia' : 'stok kosong';
    const status_pengiriman = 'menunggu penjual';

    await db.collection('barang').doc(id_barang).set({
      id_barang,
      id_user,
      nama_barang,
      deskripsi,
      harga,
      stok,
      id_kategori,
      status_stock,
      status_pengiriman,
      created_at: new Date().toISOString(),
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
    const barang = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil barang berdasarkan id user login
exports.getBarangUser = async (req, res) => {
  try {
    const id_user = req.user.id; // Ambil dari JWT
    const snapshot = await db.collection('barang')
      .where('id_user', '==', id_user)
      .get();

    const barang = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Edit detail barang, bukan status pengiriman
exports.editBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Ambil data lama
    const barangRef = db.collection('barang').doc(id);
    const barangSnap = await barangRef.get();

    if (!barangSnap.exists) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    const barangLama = barangSnap.data();

    // Jika stok diubah, perbarui status_stock
    let status_stock = barangLama.status_stock;
    if (data.stok !== undefined) {
      status_stock = data.stok > 0 ? 'stok tersedia' : 'stok kosong';
    }

    await barangRef.update({
      ...data,
      status_stock
    });

    res.status(200).json({ message: 'Barang berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.hapusBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const barangRef = db.collection('barang').doc(id);
    const barangSnap = await barangRef.get();

    if (!barangSnap.exists) {
      return res.status(404).json({ message: 'Barang tidak ditemukan' });
    }

    const barang = barangSnap.data();

    // Validasi: hanya pemilik barang atau admin yang bisa hapus
    if (req.user.role !== 'admin' && req.user.id !== barang.id_user) {
      return res.status(403).json({ message: 'Tidak diizinkan menghapus barang ini' });
    }

    await barangRef.delete();
    res.status(200).json({ message: 'Barang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

