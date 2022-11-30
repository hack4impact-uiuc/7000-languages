const { User, Complete } = require('./user');
const {
  Course,
  CourseDetails,
  Unit,
  Lesson,
  Vocab,
  isUniqueOrder,
} = require('./language');

const models = {
  User,
  Course,
  CourseDetails,
  Unit,
  Lesson,
  Vocab,
  Complete,
};

module.exports = {
  models,
  isUniqueOrder,
};
