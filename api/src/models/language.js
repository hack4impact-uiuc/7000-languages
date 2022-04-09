const mongoose = require('mongoose');

/* Schemas */

const CourseDetails = new mongoose.Schema({
  admin_name: { type: String, required: true },
  admin_email: { type: String, required: true },
  name: { type: String, required: true },
  alternative_name: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  iso: { type: String, required: false, default: '' },
  glotto: { type: String, required: false, default: '' },
  translated_language: { type: String, required: false, default: 'English' },
  population: { type: String, required: false, default: '' },
  location: { type: String, required: false, default: '' },
  link: { type: String, required: false, default: '' },
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
  description: { type: String, required: false, default: '' },
});


Unit.index({ _course_id: 1, _order: 1 });

const Vocab = new mongoose.Schema({
  _order: { type: Number, required: true, index: true },
  original: { type: String, required: true },
  translation: { type: String, required: true },
  image: { type: String, required: false, default: '' },
  audio: { type: String, required: false, default: '' },
  notes: { type: String, required: false, default: '' },
});

Vocab.index({ _order: 1 });

const Lesson = new mongoose.Schema({
  _course_id: { type: String, required: true, index: true },
  _unit_id: { type: String, required: true, index: true },
  name: { type: String, required: true },
  _order: { type: Number, required: true, index: true },
  selected: { type: Boolean, required: true },
  vocab: { type: [Vocab], required: true, default: [] },
  description: { type: String, required: false, default: '' },
});

Lesson.index({ _course_id: 1, _unit_id: 1, _order: 1 });

/* Validation Methods */

/**
 * Checks if the step number is unique among all other steps. This
 * function is meant to be called in transactions.
 * @param {Number} stepNumber The step number to check.
 * @param {String} stepKey The stepKey for the step we're validating.
 * @param {Object} session The session object for this transaction.
 * @returns True if the step number is unique.
 */
const isUniqueOrder = async (_order, _id, collectionName, session) => {
  // Find all steps with this step number
  const documents = await mongoose.connection.db
    .collection(collectionName)
    .find({ _order }, { session })
    .toArray();

  // If there's more than one, it's not unique.
  if (documents.length >= 2) { return false; }

  // If there's zero, then we're about to add it, and it must be unique
  if (documents.length === 0) { return true; }

  // If there's exactly one, the stepKeys better match
  return documents[0]._id === _id;
};

// Run validator when _order is changed.
Lesson.path('_order').validate(async function () {
  return isUniqueOrder(this._order, this._id, "Lesson");
});

/* Exports */

module.exports.Course = mongoose.model('Course', Course);
module.exports.CourseDetails = mongoose.model('CourseDetails', CourseDetails);
module.exports.Unit = mongoose.model('Unit', Unit);
module.exports.Lesson = mongoose.model('Lesson', Lesson);
module.exports.Vocab = mongoose.model('Vocab', Vocab);
module.exports.isUniqueOrder = isUniqueOrder;
