const express = require('express');
const { registerUser, authUser, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const Log = require('../models/Log'); 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/protected', protect, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

router.get('/logs', protect, async (req, res) => {
    try {
        const logs = await Log.find();
        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.post('/logout', protect, logoutUser);

// Endpoint do obsługi przerwy
router.post('/pause', protect, async (req, res) => {
    try {
        const logEntry = new Log({
            user: req.user._id,
            action: 'pause',
            details: `User paused at ${new Date().toISOString()}`
        });
        await logEntry.save();
        res.status(200).json({ message: 'Session paused' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Endpoint do obsługi powrotu
router.post('/resume', protect, async (req, res) => {
    try {
        const logEntry = new Log({
            user: req.user._id,
            action: 'resume',
            details: `User resumed at ${new Date().toISOString()}`
        });
        await logEntry.save();
        res.status(200).json({ message: 'Session resumed' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
