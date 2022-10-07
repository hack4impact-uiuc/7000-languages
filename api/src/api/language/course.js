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
const { getNumUnitsInCourse, patchDocument } = require('../../utils/languageHelper');
const {
  exampleData
} = require('../../utils/example-data.js');

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

async function generateDefaultUnits(course_id) {
  for (const element of exampleData.units) {
    const temp = element;
    temp['_course_id'] = course_id;
    console.log('the fucking course id' + course_id);

    // errorWrap(async (req, res) => {
    const unitData = temp;//req.body;
    console.log('fuck me');

    // if (unitData.name === '' || unitData.description === '') {
    //   return sendResponse(
    //     res,
    //     400,
    //     'You are missing a unit name and/or description. Please try again.',
    //   );
    // }

    // const course_id = unitData._course_id;

    const order = await getNumUnitsInCourse(course_id);

    const newUnit = new models.Unit({
      _course_id: course_id,
      name: unitData.name,
      _order: order,
      selected: unitData.selected,
      description: unitData.description,
    });

    await newUnit.save();
    let newResult = newUnit.toJSON();
    newResult.num_lessons = 0;

    console.log(newResult);

    // return sendResponse(res, 200, 'Successfully created a new unit', newResult);
    // })

    // const response = await withAuthentication(
    //   request(app).post('/language/unit').send(temp)
    // );


    // const message = response.body.message;
    // const result = omitDeep(response.body.result, '__v', '_id');
    // expect(response.status).toBe(200);
    // expect(message).toEqual('Successfully created a new unit');
    // expect(result).toEqual(POST_EXPECTED_UNIT);
  }
  return
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

    // const temp = POST_SIMPLE_UNIT;
    // temp['name'] = 'asdf';
    // console.log(temp);
    // console.log('ADMINID: ' + user.authID);

    // const newCourse2 = new models.Course(
    //   POST_SIMPLE_UNIT
    //   // how can i input the POST_SIMPLE_UNIT data without unwrapping every element
    // );
    // newCourse2
    // await newCourse2.save();
    // let newResult = newCourse2.toJSON();

    newCourse.details.description = 'bruh';

    generateDefaultUnits(newCourse._id);

    await newCourse.save();
    let newResult = newCourse.toJSON();
    newResult = _.omit(newResult, ['admin_id']);

    await models.User.updateOne(
      { _id: user._id },
      { $push: { adminLanguages: newCourse._id } },
    );

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
