const express = require('express');
const router = express.Router();
const barangControlller = require('../controllers/barangController');
const { verifyToken } = require('../middlewares/authMiddlewares');

router.post('/', verifyToken,barangControlller.tambahBarang);
router.get('/', barangControlller.getSemuaBarang);
router.get('/user', verifyToken, barangControlller.getBarangUser);
router.put('/:id', barangControlller.editBarang);
router.delete('/:id', verifyToken, barangControlller.hapusBarang);

module.exports = router;