const express = require('express');
const router = express.Router();
const barangControlller = require('../controllers/barangController');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');


router.post('/', verifyFirebaseToken,barangControlller.tambahBarang);
router.get('/', barangControlller.getSemuaBarang);
router.get('/user', verifyFirebaseToken, barangControlller.getBarangUser);
router.put('/:id', barangControlller.editBarang);
router.delete('/:id', verifyFirebaseToken, barangControlller.hapusBarang);

module.exports = router;