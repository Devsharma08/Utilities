const User = require('../model/User');
const { createToken,compareToken } = require('../utils/jwtToken')

const registerUser = async (req, res) => {
  try {
    const {name,email,password} = req.body;

    const user = new User({name,password,email});
    await user.save();
    const token = createToken({name:user.name,id:user._id});
    // console.log("inside userController token: ", token);
    // console.log(createToken({name:user.email,id:user._id}));
    res.status(201).json({ message: 'User registered successfully', user ,"token":token});
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({"count":users.length, users});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single user by ID
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  deleteUser,
};
