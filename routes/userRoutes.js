// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only Admin can create a user
router.post('/', authenticate, authorize('Admin'), createUser);

module.exports = router;
