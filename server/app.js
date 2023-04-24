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
const auth = require('./routes/authRoute');
const author = require('./routes/authorRoute');
const parentCategory = require('./routes/parentCategoryRoute');

const app = express();

// app.use(
//   cros({
//     origin: ['http://localhost:3000'],
//     methods: 'GET,POST,PUT,DELETE,OPTIOND',
//   })
// );

app.use(express.json());
app.use('/auth', auth);
app.use('/author', author);
app.use('/parentCategory', parentCategory);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(secssion({ secret: 'books', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get('/auth/protected', isLoggedIn, (req, res) => {
  res.send({ user: req.user });
});

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

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
