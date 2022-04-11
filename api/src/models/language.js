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

// TODO: update find to consider course and unit id

/**
 * Checks if the step number is unique among all other steps. This
 * function is meant to be called in transactions.
 * @param {Number} stepNumber The step number to check.
 * @param {String} stepKey The stepKey for the step we're validating.
 * @param {Object} session The session object for this transaction.
 * @returns True if the step number is unique.
 */
const isUniqueOrder = async (params, _id, model, session = null) => {
  // Find all steps with this step number

  let documents;

  if (session) {
    documents = await model.find(params).session(session).lean();
  } else {
    documents = await model.find(params).lean();
  }

  if (documents.length > 2) {
    // If there's more than two, it's not unique.
    return false;
  } else if (documents.length <= 1) {
    // If there is one, it is unique
    return true;
  }

  const string_id = _id.toString();

  // If there's exactly two, the _id better match
  if (
    documents[0]._id.toString() !== string_id &&
    documents[1]._id.toString() !== string_id
  ) {
    console.error('bad _id');
    return false;
  }

  // If there is exactly two, only one document should be selected
  return documents[0].selected !== documents[1].selected;
};

// Run validator when _order is changed.
Lesson.path('_order').validate(async function () {
  const isUnique = await isUniqueOrder(
    {
      _order: this._order,
      _course_id: this._course_id,
      _unit_id: this._unit_id,
    },
    this._id,
    LessonModel,
  );
  return isUnique;
});

/* Exports */
const LessonModel = mongoose.model('Lesson', Lesson);

module.exports.Course = mongoose.model('Course', Course);
module.exports.CourseDetails = mongoose.model('CourseDetails', CourseDetails);
module.exports.Unit = mongoose.model('Unit', Unit);
module.exports.Lesson = LessonModel;
module.exports.Vocab = mongoose.model('Vocab', Vocab);
module.exports.isUniqueOrder = isUniqueOrder;
