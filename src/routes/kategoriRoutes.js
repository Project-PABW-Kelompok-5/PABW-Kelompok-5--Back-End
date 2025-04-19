const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');

router.post('/', kategoriController.tambahKategori);
router.get('/', kategoriController.getSemuaKategori);
router.put('/:id', kategoriController.editKategori);
router.delete('/:id', kategoriController.hapusKategori);

module.exports = router;