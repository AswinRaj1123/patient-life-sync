const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getMe,
  updateMe
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
