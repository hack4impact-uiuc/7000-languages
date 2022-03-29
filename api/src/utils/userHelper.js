const { models } = require('../models/index.js');
import { getNumUnitsInCourse } from './languageHelper'

module.exports.getCoursesByUser = async (courseList) => {
    const courseData = courseList.map(async (courseId) => {
        const singleCourse = await getCourseById(courseId);
        return singleCourse;
    });

    await Promise.all(courseData);
    return courseData;
}

const getCourseById = async (courseId) => {
    const courseData = models.Course.findById(courseId);
    if (courseData) {
        const num_units = await getNumUnitsInCourse(courseId);
        return ({
            name: courseData.details.name,
            _id: courseId,
            num_units
        })
    }
    return null;
};
