const mongoose = require('mongoose');

const Home = new mongoose.Schema({
  role: { type: Number, required: true },
  authID: { type: String, required: true },
  firstName: { type: String, required: false, default: '' },
  lastName: { type: String, required: false, default: '' },
  adminLanguages: { type: [String], required: false, default: [] },
  learnerLanguags: { type: [String], required: false, default: [] },
  collaboratorLanguages: { type: [String], required: false, default: [] },
});

module.exports.Home = mongoose.model('Home', Home);
