const express = require('express');
const { register, getUserInfo } = require('../controllers/authController');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');

const router = express.Router();

router.post('/register', register);
router.post('/me', verifyFirebaseToken, getUserInfo);

module.exports = router;
