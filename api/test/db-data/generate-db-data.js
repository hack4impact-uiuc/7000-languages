const fs = require('fs');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const NUM_FAKE_ENTRIES = 50;

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

// Change this to change what data is generated
const generate = () => {
  const userData = generateUsers(NUM_FAKE_ENTRIES);

  saveDataToFile(userData, './mock-data/users.json');
};

generate();
