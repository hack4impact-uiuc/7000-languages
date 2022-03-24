const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const { models } = require('../../src/models');
const userData = require('../db-data/users.json');
const courseData = require('../db-data/courses.json');
const unitData = require('../db-data/units.json');
const lessonData = require('../db-data/lessons.json');

let users = null;
let courses = null;
let units = null;
let lessons = null;

const replSet = new MongoMemoryReplSet({
  replSet: { storageEngine: 'wiredTiger' },
});

/**
 * Connect to the in-memory database.
 * Should only be called once per suite
 */
module.exports.connect = async () => {
  if (replSet._state !== 'running') {
    await replSet.start();
  }
  await replSet.waitUntilRunning();
  const uri = replSet.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
  await this.resetDatabase();
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
  await this.clearDatabase();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/**
 * Resets the database to it's original state with mock data.
 */
module.exports.resetDatabase = async () => {
  await this.clearDatabase();
  constructStaticData();
  await saveMany(users);
  await saveMany(courses);
  await saveMany(units);
  await saveMany(lessons);
};

const saveMany = async (modelList) => {
  for (let i = 0; i < modelList.length; i++) {
    const model = modelList[i];
    model.isNew = true;
    await model.save();
  }
};

const constructStaticData = () => {
  if (users) {
    return;
  }

  users = constructAll(userData, models.User);
  courses = constructAll(courseData, models.Course);
  units = constructAll(unitData, models.Unit);
  lessons = constructAll(lessonData, models.Lesson);
};

const constructAll = (data, constructor) =>
  data.map((item) => new constructor(item));

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
