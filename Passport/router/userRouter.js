const express = require('express');
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require('../controllers/userController');

// Register
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

// Get single user
router.get('/:id', getUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;
