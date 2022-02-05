const mongoose = require('mongoose');
const log = require('loglevel');

// CONNECTION TO MONGO

/**
 * Initalizes and connects to the DB. Should be called at app startup.
 */
module.exports.initDB = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.Promise = global.Promise;

  mongoose.connection
    .once('open', () => {
      log.info('Connected to the DB');
    })
    .on('error', (error) =>
      log.error('Error connecting to the database: ', error),
    );
};
