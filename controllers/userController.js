const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

// @desc: Register new user
// @access: Public
// @route POST /api/users
const registerUser = asyncHandler(async (req, res) => {
 try {
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ message: 'User created', _id: user.id, name: user.name, token: generateToken(user._id) })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  };
} catch (error) {
  res.status(500);
  throw new Error('Server Error');
}
});

// @desc: Login user
// @access: Public
// @route POST /api/users
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.json({
        message: 'User logged in',
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc: Get user data
// @access: Public
// @route GET /api/users/me
const getUser = async (req, res) => {
  try {
    // TODO: Fetching logic here
    res.json({ message: 'User data' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getUser };
