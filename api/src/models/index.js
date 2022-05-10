const { User } = require('./user');
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
};

module.exports = {
  models,
  isUniqueOrder,
};
