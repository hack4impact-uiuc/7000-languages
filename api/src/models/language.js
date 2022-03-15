const mongoose = require('mongoose');

const CourseDetails = new mongoose.Schema({
  name: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  translated_language: { type: String, required: true, default: 'English' },
  location: { type: String, required: true, default: '' },
  iso: { type: String, required: true },
});

const Course = new mongoose.Schema({
  approved: { type: Boolean, required: true },
  admin_id: { type: String, required: true },
  details: { type: CourseDetails, required: true },
});

const Unit = new mongoose.Schema({
  _course_id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  _order: { type: Number, required: true, index: true },
  selected: { type: Boolean, required: true },
  description: { type: String, required: true, default: '' },
});

Unit.index({ _course_id: 1, _order: 1 });

const Vocab = new mongoose.Schema({
  _order: { type: Number, required: true, index: true },
  original: { type: String, required: true },
  translation: { type: String, required: true },
  image: { type: String, required: false, default: '' },
  audio: { type: String, required: false, default: '' },
  notes: { type: String, required: true, default: '' },
});

Vocab.index({ _order: 1 });

const Lesson = new mongoose.Schema({
  _course_id: { type: String, required: true, index: true },
  _unit_id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  _order: { type: Number, required: true, index: true },
  selected: { type: Boolean, required: true },
  vocab: { type: [Vocab], required: true, default: [] },
  description: { type: String, required: true, default: '' },
});

Lesson.index({ _course_id: 1, _unit_id: 1, _order: 1 });

module.exports.Course = mongoose.model('Course', Course);
module.exports.CourseDetails = mongoose.model('CourseDetails', CourseDetails);
module.exports.Unit = mongoose.model('Unit', Unit);
module.exports.Lesson = mongoose.model('Lesson', Lesson);
module.exports.Vocab = mongoose.model('Vocab', Vocab);
