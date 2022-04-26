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
const fileUpload = require('express-fileupload');

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  }),
);

app.use(helmet());
app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '2.1mb' }));
app.use(bodyParser.urlencoded({ limit: '2.1mb', extended: false }));

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
