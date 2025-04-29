// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddlewares');
const { verifyAdmin } = require('../middlewares/authMiddlewares');

// CRUD user (dengan middleware untuk verifikasi token dan role admin)
router.post('/users', verifyToken, verifyAdmin, adminController.addUser);
router.get('/users', verifyToken, verifyAdmin, adminController.getAllUsers);
router.get('/users/:id', verifyToken, verifyAdmin, adminController.getUserById);
router.put('/users/:id', verifyToken, verifyAdmin, adminController.updateUser);
router.delete('/users/:id', verifyToken, verifyAdmin, adminController.deleteUser);

module.exports = router;
