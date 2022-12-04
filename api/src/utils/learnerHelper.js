const { models } = require('../models');

/**
 * Determines if a user has completed a unit
 * @param {String} user_id User MongoDB _id
 * @param {String} unit_id MongoDB _id of the unit to check
 * @returns True if the unit is complete
 */
const hasCompletedUnit = async (user_id, unit_id) => {
  if (!user_id || !unit_id) {
    return false;
  }

  const selectedLessons = await models.Lesson.find({
    _unit_id: { $eq: unit_id },
    selected: { $eq: true },
  });

  const checkCompletedList = [];

  for (let lesson of selectedLessons) {
    checkCompletedList.push(hasCompletedLesson(user_id, lesson._id));
  }

  const results = await Promise.all(checkCompletedList);

  // See if there is any uncompleted lesson
  for (let val of results) {
    if (!val) {
      return false;
    }
  }

  return true;
};

/**
 * Determines if a user has completed a specific lesson
 * @param {String} user_id User MongoDB _id
 * @param {String} lesson_id MongoDB _id of the lesson to check
 * @returns True if the lesson is marked as complete
 */
const hasCompletedLesson = async (user_id, lesson_id) => {
  if (!lesson_id || !user_id) {
    return false;
  }
  const docExists = await models.Complete.exists({
    user_id: user_id,
    _lesson_id: lesson_id,
  });
  return docExists;
};

module.exports.hasCompletedLesson = hasCompletedLesson;

/**
 * Gets all lessons a user has completed within a given unit
 * @param {String} user_id User MongoDB _id
 * @param {String} unit_id MongoDB _id of the unit to check
 * @returns List of lessons completed in the unit
 */
const getAllCompletedLessons = async (user_id, unit_id) => {
  if (!unit_id || !user_id) {
    return false;
  }
  const completedLessons = await models.Complete.find({
    user_id: user_id,
    _unit_id: unit_id,
  });
  const filteredLessons = completedLessons.map((val) => val._lesson_id);
  return filteredLessons;
};

module.exports.getAllCompletedLessons = getAllCompletedLessons;

const getAllCompletedUnits = async (user_id, course_id) => {
  if (!course_id || !user_id) {
    return false;
  }

  let units = await models.Unit.find({ _course_id: course_id, selected: true });

  const checkCompletedList = [];

  for (let unit of units) {
    checkCompletedList.push(hasCompletedUnit(user_id, unit._id));
  }

  const results = await Promise.all(checkCompletedList);

  const completedUnits = [];

  // See if there is any uncompleted lesson
  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      completedUnits.push(String(units[i]._id));
    }
  }

  return completedUnits;
};

module.exports.getAllCompletedUnits = getAllCompletedUnits;

/**
 * Determines if a user has joined a specific course
 * @param {String} user_id User MongoDB _id
 * @param {String} course_id MongoDB _id of the course to check
 * @returns True if the course is listed as a learner language
 */
const isPartOfCourse = async (user_id, course_id) => {
  if (!course_id || !user_id) {
    return false;
  }

  const course = await models.User.findById(user_id);
  console.log("course: ", course)
  if(course)
  {
    const index = course.learnerLanguages.findIndex(course_id);
    if(index == -1)
    {
      return false;
    }
  }
  return true;
}

module.exports.isPartOfCourse = isPartOfCourse;