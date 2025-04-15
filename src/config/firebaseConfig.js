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
    apiKey: "AIzaSyCAOvzGJat0Sw82RRHsDshY0jxBHPRUZ1E",
    authDomain: "pabw-kel-5.firebaseapp.com",
    projectId: "pabw-kel-5",
    storageBucket: "pabw-kel-5.firebasestorage.app",
    messagingSenderId: "874185015872",
    appId: "1:874185015872:web:d6543f65c800d91f8395a5",
    measurementId: "G-W3C7Z6J1JL",
};

// Cek apakah Firebase Client sudah diinisialisasi
if (!firebase.getApps || firebase.getApps().length === 0) {
    firebase.initializeApp(firebaseConfig);
}

module.exports = { db, firebase };
