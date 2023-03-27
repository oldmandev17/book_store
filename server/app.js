const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config({ path: './configs/.env' });
require('./helpers/initMongodb');
require('./helpers/initRedis');
const { verifyAccessToken } = require('./middlewares/jwtHelper');
const passport = require('passport');
const secssion = require('express-session');
// const cros = require('cros');

const app = express();

// app.use(
//   cros({
//     origin: ['http://localhost:3000'],
//     methods: 'GET,POST,PUT,DELETE,OPTIOND',
//   })
// );
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(secssion({ secret: 'books', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const auth = require('./routes/authRoute');

app.use('/auth', auth);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server started on PORT: ${PORT} in ${process.env.NODE_ENV}mode.`
  );
});
