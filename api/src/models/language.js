const mongoose = require('mongoose');

// function to get a random code for a new course
const getRandomCode = () => Math.random().toString(36).substring(2, 7);

/* Schemas */

const CourseDetails = new mongoose.Schema({
  admin_name: { type: String, required: true },
  admin_email: { type: String, required: true },
  name: { type: String, required: true },
  alternative_name: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  iso: { type: String, required: false, default: '' },
  glotto: { type: String, required: false, default: '' },
  translated_language: { type: String, required: true, default: 'English' },
  population: { type: String, required: false, default: '' },
  location: { type: String, required: false, default: '' },
  link: { type: String, required: false, default: '' },
  is_private: { type: Boolean, required: false, default: true },
  code: { type: String, required: false, default: getRandomCode },
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
  selected: { type: Boolean, required: true, default: true },
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
 * Determines whether a document with a specific _id has a specific order
 * @param {JSON} params Parameters considered when searching for all documents in model
 * @param {ObjectId} _id document that we are checking
 * @param {Mongoose Model} model Model that the document belongs to
 * @param {Object} session Mongoose Transaction Session object
 * @returns true if the document with _id has a unique order
 */
const isUniqueOrder = async (params, _id, model, session = null) => {
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
    return false;
  }

  // If there is exactly two, only one document should be selected
  return documents[0].selected !== documents[1].selected;
};

/* Exports */
module.exports.Course = mongoose.model('Course', Course);
module.exports.CourseDetails = mongoose.model('CourseDetails', CourseDetails);
module.exports.Unit = mongoose.model('Unit', Unit);
module.exports.Lesson = mongoose.model('Lesson', Lesson);
module.exports.Vocab = mongoose.model('Vocab', Vocab);
module.exports.isUniqueOrder = isUniqueOrder;
