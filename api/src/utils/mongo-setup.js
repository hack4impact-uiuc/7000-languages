const mongoose = require('mongoose');

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
      console.log('Connected to the DB');
    })
    .on('error', (error) =>
      console.error('Error connecting to the database: ', error),
    );
};
