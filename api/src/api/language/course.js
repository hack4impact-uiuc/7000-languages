const express = require('express');
const router = express.Router();
const { errorWrap } = require('../../middleware');
const { sendResponse } = require('../../utils/response');
const { models } = require('../../models/index.js');
const { requireAuthentication } = require('../../middleware/authentication');
const {
  requireLanguageAuthorization,
} = require('../../middleware/authorization');
const _ = require('lodash');
const { ERR_NO_COURSE_DETAILS } = require('../../utils/constants');
const {
  getNumLessonsInUnit,
  getNumUnitsInCourse,
  patchDocument,
} = require('../../utils/languageHelper');
const { exampleData } = require('../../utils/example-data.js');

/**
 * Does a patch update a single course in the database, meaning
 * it makes changes to parts of the course specified in the request.
 */
router.patch(
  '/:id',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    const updates = req.body;

    const course_id = req.params.id;

    const course = await models.Course.findById(course_id);

    patchDocument(course, updates);

    await course.save();
    return sendResponse(res, 200, 'Successfully updated course', course);
  }),
);

/**
 * Uploads example units, lessons, and vocab items for any new course that is created.
 * @param {course_id} course_id of the new course that was just created
 */
async function populateExampleData(course_id) {
  for (const unit of exampleData.units) {
    // Get data for the unit from exampleData
    const unitData = unit['unitData'];

    // Update example unit data with IDs and order
    const order = await getNumUnitsInCourse(course_id);
    unitData['_course_id'] = course_id;
    unitData['_order'] = order;

    // Create and save new unit
    const newUnit = new models.Unit(unitData);
    await newUnit.save();
    const unit_id = newUnit._id;

    for (const lesson of unit['lessons']) {
      // Get data for the lesson
      const lessonData = lesson['lessonData'];

      // Set additional IDs and variables for the lesson
      const numLessons = await getNumLessonsInUnit(course_id, unit_id);
      lessonData._order = numLessons;
      lessonData.vocab = [];
      lessonData._course_id = course_id;
      lessonData._unit_id = unit_id;

      // Create and save new lesson
      const newLesson = new models.Lesson(lessonData);
      await newLesson.save();
      const lesson_id = newLesson._id;

      for (const vocab of lesson['vocab']) {
        // Refetch the current lesson
        const currentLesson = await models.Lesson.findById(lesson_id);

        // Set additional variables and ID for vocab item
        vocab._order = currentLesson.vocab.length;
        vocab._lesson_id = lesson_id;

        // Append vocab item to lesson list
        currentLesson.vocab.push(vocab);
        await currentLesson.save();
      }
    }
  }
}

/**
 * Creates a new course in the database
 */
router.post(
  '/',
  requireAuthentication,
  errorWrap(async (req, res) => {
    const user = req.user;
    const courseData = req.body;
    if (!courseData.details) {
      return sendResponse(res, 404, ERR_NO_COURSE_DETAILS);
    }
    const newCourse = new models.Course({
      approved: true,
      admin_id: user.authID,
      details: courseData.details,
    });

    await newCourse.save();
    let newResult = newCourse.toJSON();
    newResult = _.omit(newResult, ['admin_id']);

    await models.User.updateOne(
      { _id: user._id },
      { $push: { adminLanguages: newCourse._id } },
    );

    // Load and save the example units/lessons/vocab items for the course
    populateExampleData(newCourse._id);

    return sendResponse(
      res,
      200,
      'Successfully created a new course',
      newResult,
    );
  }),
);

/**
 * Fetches specified course in the database
 */
router.get(
  '/:id',
  requireAuthentication,
  requireLanguageAuthorization,
  errorWrap(async (req, res) => {
    let course = await models.Course.findOne({ _id: req.params.id });
    course = course.toJSON();
    let units = await models.Unit.find({ _course_id: req.params.id });
    for (var i = 0; i < units.length; i++) {
      const numLessons = await models.Lesson.countDocuments({
        _unit_id: { $eq: units[i]._id },
        selected: { $eq: true },
      });
      units[i] = units[i].toJSON();
      units[i].num_lessons = numLessons;
    }
    let newCourse = _.omit(course, ['admin_id']);
    const returnedData = {
      course: newCourse,
      units: units,
    };
    return sendResponse(res, 200, 'Successfully fetched course', returnedData);
  }),
);

module.exports = router;
