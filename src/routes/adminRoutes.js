// routes/adminRoutes.js
const { Router } = require('express');
const router = Router();
const adminController = require('../controllers/adminController');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin'); // jangan pakai authMiddlewares lagi


// CRUD user (dengan middleware untuk verifikasi token dan role admin)
router.post('/users', verifyFirebaseToken, verifyAdmin, adminController.addUser);
router.get('/users', verifyFirebaseToken, verifyAdmin, adminController.getAllUsers);
router.get('/users/:id', verifyFirebaseToken, verifyAdmin, adminController.getUserById);
router.put('/users/:id', verifyFirebaseToken, verifyAdmin, adminController.updateUser);
router.delete('/users/:id', verifyFirebaseToken, verifyAdmin, adminController.deleteUser);


module.exports = router;
