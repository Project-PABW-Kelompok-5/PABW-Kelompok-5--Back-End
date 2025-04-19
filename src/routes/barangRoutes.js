const express = require('express');
const router = express.Router();
const barangControlller = require('../controllers/barangController');

router.post('/', barangControlller.tambahBarang);
router.get('/', barangControlller.getSemuaBarang);
router.put('/:id', barangControlller.editBarang);
router.delete('/:id', barangControlller.hapusBarang);

module.exports = router;