const createError = require('http-errors');
const User = require('../models/userModel');
const {
  authRegisterSchema,
  authLoginSchema,
} = require('../utils/validationSchema');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../middlewares/jwtHelper');
const client = require('../helpers/initRedis');
const UserVerification = require('../models/userVerificationModel');
const PasswordReset = require('../models/passwordResetModel');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const { email, displayName } = profile;
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
          username: displayName,
          email,
          password: '123',
          verified: true,
        });
        const userSaved = await newUser.save();
        done(null, userSaved);
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendVerificationEmail = async ({ _id, email }, res, next) => {
  try {
    const currentUrl = 'http://127.0.0.1:5000/';
    const uniqueString = '123' + _id;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Verify your email address to complete the signup and login into your account</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href=${
        currentUrl + 'auth/verify/' + _id + '/' + uniqueString
      }>here</a> to procced</p>`,
    };
    const saltRounds = 10;
    const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
    const newVerification = new UserVerification({
      userId: _id,
      uniqueString: (await hashedUniqueString).toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await newVerification.save();
    await transporter.sendMail(mailOptions);
    res.send('Verification email sent');
  } catch (error) {
    next(error);
  }
};

const sendResetEmail = async ({ _id, email }, redirectUrl, res, next) => {
  try {
    const resetString = uuidv4() + _id;
    await PasswordReset.deleteMany({ userId: _id });
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Password Reset',
      html: `<p>We heard that your lost the password.</p><p>Don't worry, use the link below to reset it.</p><p>This link <b>expires in 60 minutes</b>.</p><p>Press <a href=${
        redirectUrl + '/' + _id + '/' + resetString
      }>here</a> to procced.</p>`,
    };
    const saltRounds = 10;
    const hashedResetString = await bcrypt.hash(resetString, saltRounds);
    const newPasswordReset = new PasswordReset({
      userId: _id,
      resetString: (await hashedResetString).toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await newPasswordReset.save();
    await transporter.sendMail(mailOptions);
    res.send('Password reset email sent');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authRegisterSchema.validateAsync(req.body);

      const doesExist = await User.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(
          `${result.email} is already been registered`
        );

      const user = new User({ ...result, verified: false });
      const savedUser = await user.save();

      await sendVerificationEmail(savedUser, res, next);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { userId, uniqueString } = req.params;
      const userVerification = await UserVerification.findOne({ userId });
      if (!userVerification)
        throw createError.NotFound('User not exist or verified already.');
      const { expiresAt, uniqueString: hashedUniqueString } = userVerification;
      if (expiresAt < Date.now()) {
        await User.deleteOne({ _id: userId });
      } else {
        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (!isMatch)
          throw createError.Unauthorized('Username/password not exist');
        await User.updateOne({ _id: userId }, { verified: true });
        await UserVerification.deleteOne({ userId });
        await signAccessToken(userId);
        await signRefreshToken(userId);
        res.send('Verified');
      }
    } catch (error) {
      next(error);
    }
  },

  verified: async (req, res, next) => {
    try {
      res.send('Verified email');
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authLoginSchema.validateAsync(req.body);

      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound('User not registerd');
      if (!user.verified)
        throw createError.BadRequest(
          "Email hasn't been verified yet. Check your inbox."
        );

      const isMatch = await user.isValidPassword(result.password);

      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid');

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'));
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const newRefreshToken = await signRefreshToken(userId);

      res.send({ accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);

      client.DEL(userId, (err, val) => {
        if (err) throw createError.InternalServerError();
      });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },

  requestPasswordReset: async (req, res, next) => {
    try {
      const { email, redirectUrl } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw createError.NotFound('User not existed');
      if (!user.verified)
        throw createError.BadRequest(
          "Email hasn't been verified yet. Check your inbox."
        );
      await sendResetEmail(user, redirectUrl, res, next);
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { userId, resetString, newPassword } = req.body;
      const user = await PasswordReset.findOne({ userId });
      if (!user) throw createError.NotFound('Password reset request not found');
      const { expiresAt, resetString: hashedResetString } = user;
      if (expiresAt < Date.now()) {
        await PasswordReset.deleteOne({ userId });
      } else {
        const isMatch = await bcrypt.compare(resetString, hashedResetString);
        if (!isMatch)
          throw createError.Unauthorized('Username/password not exist');
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.updateOne({ _id: userId }, { password: hashedNewPassword });
        await PasswordReset.deleteOne({ userId });
        res.send('Reset password successfully');
      }
    } catch (error) {
      next(error);
    }
  },

  google: async (req, res, next) => {
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    });
  },

  googleCallback: async (req, res, next) => {
    passport.authenticate('google', {
      successRedirect: 'auth/protected',
      failureRedirect: 'auth/google/failure',
    });
  },

  protected: async (req, res, next) => {
    res.send({ user: req.user });
  },

  isLoggedIn: async (req, res, next) => {
    return req.user ? next() : createError[401];
  },

  googleFailure: async (req, res, next) => {
    res.send('Something went wrong!');
  },
};
