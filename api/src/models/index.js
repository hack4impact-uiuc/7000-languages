const { User } = require('./user');
const { Course } = require('./language');
const { CourseDetails } = require('./language');
const { Unit } = require('./language');
const { Lesson } = require('./language');
const { Vocab } = require('./language');

const models = {
  User,
  Course,
  CourseDetails,
  Unit,
  Lesson,
  Vocab,
};

module.exports = {
  models,
};
