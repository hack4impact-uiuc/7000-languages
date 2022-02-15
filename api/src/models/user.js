const mongoose = require('mongoose');

const Home = new mongoose.Schema({
  role: { type: Number, required: true },
  authID: { type: String, required: true },
  adminLanguages: { type: [String], required: false, default: [] },
  learnerLanguags: { type: [String], required: false, default: [] },
  collaboratorLanguages: { type: [String], required: false, default: [] },
});

module.exports.Home = mongoose.model('Home', Home);
