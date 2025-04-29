const express = require('express');
const router = express.Router();
const kurirController = require('../controllers/kurirController');

router.post('/', kurirController.addKurir);
router.get('/', kurirController.getKurir);
router.put('/:id', kurirController.updateKurir);
router.delete('/:id', kurirController.deleteKurir);

module.exports = router;