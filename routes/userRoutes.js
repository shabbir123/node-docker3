const express = require('express');
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', protect, authController.signUp);
router.post('/login', authController.login);


module.exports = router;