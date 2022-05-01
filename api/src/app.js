const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./api');
const { errorHandler, errorWrap } = require('./middleware');
const { initDB } = require('./utils/mongo-setup');
const { ENV_TEST } = require('./utils/constants');
// const fileUpload = require('express-fileupload');
const bb = require('express-busboy');

const app = express();

app.use(helmet());
app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(fileUpload());
bb.extend(app, {
  upload: true,
});

// Mongo setup
if (process.env.NODE_ENV !== ENV_TEST) {
  initDB();
}

// Routes
app.use('/', apiRoutes);
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler, errorWrap);

module.exports = app;
