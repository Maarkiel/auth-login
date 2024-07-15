const Log = require('../models/Log');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    try {
      console.log("User ID:", user._id.toString());
      console.log("Action:", 'login');
      console.log("Details:", `User logged in at ${new Date().toISOString()}`);
      
      const logEntry = new Log({
        user: user._id.toString(),
        action: 'login',
        details: `User logged in at ${new Date().toISOString()}`
      });
      await logEntry.save();
    } catch (err) {
      console.error('Log creation failed:', err);
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const logoutUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    console.log("User ID:", req.user._id.toString());
    console.log("Action:", 'logout');
    console.log("Details:", `User logged out at ${new Date().toISOString()}`);
    
    const logEntry = new Log({
      user: req.user._id.toString(),
      action: 'logout',
      details: `User logged out at ${new Date().toISOString()}`
    });
    await logEntry.save();

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error('Log creation failed:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { registerUser, authUser, logoutUser };
