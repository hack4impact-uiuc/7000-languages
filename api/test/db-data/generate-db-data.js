const fs = require('fs');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const {
  DEFAULT_AUTH_ID,
  NUM_FAKE_USER_ENTRIES,
  NUM_FAKE_COURSE_ENTRIES,
  NUM_FAKE_LESSONS_PER_UNIT,
  NUM_FAKE_UNITS_PER_COURSE,
  NUM_FAKE_WORDS_PER_LESSON,
} = require('../utils/constants');

const saveDataToFile = (data, filename) => {
  const serializedData = JSON.stringify(data, null, 2);
  fs.writeFileSync(`${__dirname}/../${filename}`, serializedData);
};

/**
 * Generates n number of users
 *
 * @param {number} n the number of users to generate
 * @returns the generated users
 */
const generateUsers = (n) => {
  const generateUser = () => ({
    _id: mongoose.Types.ObjectId(),
    role: 0,
    authID: faker.datatype.uuid(),
    adminLanguages: [],
    learnerLanguages: [],
    collaboratorLanguages: [],
  });

  const users = Array(n).fill(null).map(generateUser);
  return users;
};

/**
 * Generates n number of courses
 *
 * @param {number} n the number of users to generate
 * @returns the generated users
 */
const generateLanguages = (
  num_courses,
  num_units_per_course,
  num_lessons_per_unit,
  num_words_per_lesson,
) => {
  const generateCourse = () => ({
    _id: mongoose.Types.ObjectId(),
    approved: true,
    admin_id: DEFAULT_AUTH_ID,
    details: {
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      translated_language: 'English',
      location: 'North America',
      iso: 'en',
    },
  });

  const generateUnit = (course_id, order) => ({
    _id: mongoose.Types.ObjectId(),
    _course_id: course_id,
    name: faker.lorem.word(),
    _order: order,
    selected: true,
    description: faker.lorem.paragraph(),
  });

  const generateLesson = (course_id, unit_id, order) => ({
    _id: mongoose.Types.ObjectId(),
    _course_id: course_id,
    _unit_id: unit_id,
    name: faker.lorem.word(),
    _order: order,
    selected: true,
    description: faker.lorem.paragraph(),
    vocab: Array(num_words_per_lesson)
      .fill(null)
      .map((_, index) => generateWord(index)),
  });

  const generateWord = (order) => ({
    _id: mongoose.Types.ObjectId(),
    _order: order,
    original: faker.lorem.word(),
    translation: faker.lorem.word(),
    image: faker.datatype.string(),
    audio: faker.datatype.string(),
    notes: faker.lorem.paragraph(),
  });

  const courseData = Array(num_courses).fill(null).map(generateCourse);
  const unitData = [];
  const lessonData = [];

  courseData.forEach((element) => {
    const course_id = element._id;
    for (let i = 0; i < num_units_per_course; i++) {
      unitData.push(generateUnit(course_id, i));
    }
  });

  unitData.forEach((element) => {
    const course_id = element._course_id;
    const unit_id = element._id;
    for (let i = 0; i < num_lessons_per_unit; i++) {
      lessonData.push(generateLesson(course_id, unit_id, i));
    }
  });

  return {
    courseData,
    unitData,
    lessonData,
  };
};

// Change this to change what data you want generated
const generate = () => {
  // Generates users
  const userData = generateUsers(NUM_FAKE_USER_ENTRIES);
  saveDataToFile(userData, './mock-data/users.json');

  // Generates course
  const { courseData, unitData, lessonData } = generateLanguages(
    NUM_FAKE_COURSE_ENTRIES,
    NUM_FAKE_UNITS_PER_COURSE,
    NUM_FAKE_LESSONS_PER_UNIT,
    NUM_FAKE_WORDS_PER_LESSON,
  );
  saveDataToFile(courseData, './db-data/courses.json');
  saveDataToFile(unitData, './db-data/units.json');
  saveDataToFile(lessonData, './db-data/lessons.json');
};

generate();
