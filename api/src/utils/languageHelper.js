const { models } = require('../models/index.js');

/**
 * Determines the number of units in a course
 * @param {String} courseId 
 * @returns Number
 */
module.exports.getNumUnitsInCourse = async (courseId) => {
    if (!courseId) {
        return null;
    }
    const numUnits = await models.Unit.countDocuments({ _course_id: courseId });
    return numUnits;
}