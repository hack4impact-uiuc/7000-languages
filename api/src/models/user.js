const mongoose = require('mongoose');

const User = new mongoose.Schema({
  role: { type: Number, required: true },
  authID: { type: String, required: true, unique: true },
  adminLanguages: { type: [String], required: false, default: [] },
  learnerLanguages: { type: [String], required: false, default: [] },
  collaboratorLanguages: { type: [String], required: false, default: [] },
});

module.exports.User = mongoose.model('User', User);
