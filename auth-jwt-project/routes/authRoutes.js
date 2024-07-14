const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/protected', protect, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
