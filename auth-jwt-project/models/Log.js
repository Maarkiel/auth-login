const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    user: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String, required: true },
});

module.exports = mongoose.model('Log', LogSchema);
