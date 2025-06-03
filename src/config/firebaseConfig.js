const admin = require("firebase-admin");
const firebase = require("firebase/app");
require("firebase/auth");
const dotenv = require("dotenv");

dotenv.config();

// Inisialisasi Firebase Admin SDK untuk Firestore
const serviceAccount = require(process.env.FIREBASE_CREDENTIALS);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Konfigurasi Firebase Client untuk Authentication
const firebaseConfig = {
    apiKey: "AIzaSyAIFHyOyJbHoTOR6NLSRQpMStkIoaIilmo",
    authDomain: "blessing-store-pabw.firebaseapp.com",
    projectId: "blessing-store-pabw",
    storageBucket: "blessing-store-pabw.firebasestorage.app",
    messagingSenderId: "135890577598",
    appId: "1:135890577598:web:bd4be1c8a42d676ba816ef",
    measurementId: "G-HGNCWZRJYX"
  };

// Cek apakah Firebase Client sudah diinisialisasi
if (!firebase.getApps || firebase.getApps().length === 0) {
    firebase.initializeApp(firebaseConfig);
}

module.exports = { db, firebase };
