const { models } = require('../models/index.js');
const { getNumUnitsInCourse } = require('./languageHelper');

module.exports.getCoursesByUser = async (courseList) => {
  const getCourseList = courseList.map(async (courseId) => {
    const singleCourse = await getCourseById(courseId);
    return singleCourse;
  });

  const courseData = await Promise.all(getCourseList);
  return courseData;
};

const getCourseById = async (courseId) => {
  const courseData = await models.Course.findById(courseId);
  if (courseData) {
    const num_units = await getNumUnitsInCourse(courseId);
    return {
      name: courseData.details.name,
      _id: courseId,
      num_units,
    };
  }
  return null;
};
