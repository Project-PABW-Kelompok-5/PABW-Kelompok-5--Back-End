const admin = require('firebase-admin');

// Cek jika Firebase sudah diinisialisasi, jika belum baru panggil initializeApp
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require('./path/to/your/firebase/credentials.json')),
  });
} else {
  admin.app(); // Gunakan aplikasi yang sudah ada jika sudah diinisialisasi
}

module.exports = admin;
