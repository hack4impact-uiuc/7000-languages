const mongoose = require('mongoose');

const User = new mongoose.Schema({
  role: { type: Number, required: true },
  authID: { type: String, required: true, unique: true },
  adminLanguages: { type: [String], required: false, default: [] },
  learnerLanguages: { type: [String], required: false, default: [] },
  collaboratorLanguages: { type: [String], required: false, default: [] },
});

const Complete = new mongoose.Schema({
  user_id: { type: String, required: true },
  _course_id: { type: String, required: true, index: true },
  _unit_id: { type: String, required: true, index: true },
  _lesson_id: { type: String, required: true, index: true },
});

Complete.index({ _course_id: 1, _unit_id: 1, _lesson_id: 1 });

module.exports.Complete = mongoose.model('Complete', Complete);
module.exports.User = mongoose.model('User', User);
