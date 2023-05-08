const createError = require('http-errors');
const User = require('../models/userModel');
const Wishlist = require('../models/wishlistModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const APIFeatures = require('../utils/apiFeatures');
const {
  authRegisterSchema,
  authLoginSchema,
  addressSchema,
  voucherSchema,
  updatePasswordSchema,
  profileSchema,
} = require('../utils/validationSchema');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../middlewares/jwtHelper');
const client = require('../helpers/initRedis');
const UserVerification = require('../models/userVerificationModel');
const UserLogin = require('../models/userLoginModel');
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
          name: displayName,
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

const sendVerificationEmail = async (
  { _id, email },
  urlRedirect,
  res,
  next
) => {
  try {
    const currentUrl = 'http://127.0.0.1:5000/';
    const uniqueString = uuidv4() + _id;
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
      uniqueString: hashedUniqueString.toString(),
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
      urlRedirect,
    });
    await newVerification.save();
    await transporter.sendMail(mailOptions);
    res.status(201).send('Verification email sent');
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
      resetString: hashedResetString.toString(),
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

      if (result.password !== result.confirmPassword)
        throw createError.Conflict(
          'Password and password confirm does not match.'
        );

      const doesExist = await User.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(
          `${result.email} is already been registered.`
        );

      const user = new User({ ...result, verified: false, role: 'user' });
      const savedUser = await user.save();

      await sendVerificationEmail(savedUser, result.currentUrl, res, next);
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
      const {
        expiresAt,
        uniqueString: hashedUniqueString,
        urlRedirect,
      } = userVerification;
      if (expiresAt < Date.now()) {
        await User.deleteOne({ _id: userId });
        throw createError.NotAcceptable('User verifycation is expired.');
      } else {
        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (!isMatch)
          throw createError.Unauthorized('Username/password not exist');
        await User.updateOne({ _id: userId }, { verified: true });
        await Wishlist.create({
          user: userId,
        });
        await Cart.create({
          user: userId,
        });
        await UserVerification.deleteOne({ userId });
        const loginString = uuidv4() + userId;
        await UserLogin.deleteMany({ userId });
        const saltRounds = 10;
        const hashedLoginString = await bcrypt.hash(loginString, saltRounds);
        const newUserLogin = new UserLogin({
          userId,
          loginString: hashedLoginString.toString(),
          createdAt: Date.now(),
          expiresAt: Date.now() + 3600000,
        });
        await newUserLogin.save();
        res.redirect(urlRedirect + '/' + userId + '/' + loginString);
      }
    } catch (error) {
      next(error);
    }
  },

  verified: async (req, res, next) => {
    try {
      const { userId, loginString } = req.params;
      const userLogin = await UserLogin.findOne({ userId });
      if (!userLogin)
        throw createError.NotFound('User not exist or login already.');
      const { expiresAt, loginString: hashedLoginString } = userLogin;
      if (expiresAt < Date.now()) {
        await UserLogin.deleteOne({ userId });
        throw createError.NotAcceptable('User login is expired.');
      } else {
        const isMatch = await bcrypt.compare(loginString, hashedLoginString);
        if (!isMatch)
          throw createError.Unauthorized('Username/password not valid');
        const accessToken = await signAccessToken(userId);
        const refreshToken = await signRefreshToken(userId);

        UserLogin.deleteOne({ userId });
        res.send({ accessToken, refreshToken });
      }
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
      const { refreshToken } = req.params;
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
        throw createError.NotAcceptable('Reset password is expired.');
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

  getProfile: async (req, res, next) => {
    try {
      const doesExist = await User.findById(req.payload.userId);

      if (!doesExist) throw createError.NotFound('User does not exist.');

      res.status(200).json({
        profile: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  addDeliveryAddress: async (req, res, next) => {
    try {
      const doesExist = await User.findById(req.payload.userId);

      const result = await addressSchema.validateAsync(req.body);

      if (doesExist.deliveryAddressItems.length < 1) result.default = true;
      else {
        if (result.default === true)
          doesExist.deliveryAddressItems.forEach(
            (address) => (address.default = false)
          );
      }

      doesExist.deliveryAddressItems.unshift(result);
      doesExist.deliveryAddressItems.sort((a, b) => b.default - a.default);

      await User.updateOne(
        { _id: req.payload.userId },
        { deliveryAddressItems: doesExist.deliveryAddressItems }
      );

      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  updateDeliveryAddress: async (req, res, next) => {
    try {
      const result = await addressSchema.validateAsync(req.body);
      const userExist = await User.findById(req.payload.userId);

      const addressExists = userExist.deliveryAddressItems.filter(
        (address) => address._id.toString() === req.params.id
      );

      if (addressExists.length < 1)
        throw createError.NotFound('Address does not exist.');
      if (addressExists[0].default === true && result.default === false)
        throw createError.NotAcceptable('Address is a default.');
      if (result.default === true)
        userExist.deliveryAddressItems.forEach(
          (address) => (address.default = false)
        );
      for (let address of userExist.deliveryAddressItems) {
        if (address._id.toString() === req.params.id) {
          address.name = result.name;
          address.phone = result.phone;
          address.address = result.address;
          address.default = result.default;
        }
      }
      userExist.deliveryAddressItems.sort((a, b) => b.default - a.default);
      await User.updateOne(
        { _id: req.payload.userId },
        {
          deliveryAddressItems: userExist.deliveryAddressItems,
          updatedAt: Date.now(),
        }
      );

      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  updateDefaultDeliveryAddress: async (req, res, next) => {
    try {
      const userExist = await User.findById(req.payload.userId);

      const addressExists = userExist.deliveryAddressItems.filter(
        (address) => address._id.toString() === req.params.id
      );

      if (addressExists.length < 1)
        throw createError.NotFound('Addres does not exist.');

      if (addressExists[0].default === true)
        throw createError.NotAcceptable('Address is already default.');

      userExist.deliveryAddressItems.forEach(
        (address) => (address.default = false)
      );

      for (let address of userExist.deliveryAddressItems) {
        if (address._id.toString() === req.params.id) address.default = true;
      }

      userExist.deliveryAddressItems.sort((a, b) => b.default - a.default);
      await User.updateOne(
        { _id: req.payload.userId },
        { deliveryAddressItems: userExist.deliveryAddressItems }
      );
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  removeDeliveryAddress: async (req, res, next) => {
    try {
      const userExist = await User.findById(req.payload.userId);

      const addressExists = userExist.deliveryAddressItems.filter(
        (address) => address._id.toString() === req.params.id
      );

      if (addressExists.length < 1)
        throw createError.NotFound('Address does not exist.');

      if (addressExists[0].default === true)
        throw createError.NotAcceptable('Address does not delete.');

      const newDeliveryAddressItems = userExist.deliveryAddressItems.filter(
        (address) => address._id.toString() !== req.params.id
      );
      newDeliveryAddressItems.sort((a, b) => b.default - a.default);

      await User.updateOne(
        { _id: req.payload.userId },
        { deliveryAddressItems: newDeliveryAddressItems }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  addVoucher: async (req, res, next) => {
    try {
      const result = await voucherSchema.validateAsync(req.params.voucher);
      const userExist = await User.findById(req.payload.userId);

      const voucherExist = await Coupon.findOne({ code: result });

      if (!voucherExist) throw createError.NotFound('Coupon does not exist.');

      const voucherUserExist = userExist.voucherItems.filter(
        (voucher) => voucher.coupon === result
      );

      if (voucherUserExist.length > 0)
        throw createError.NotAcceptable('Coupon is already exist.');

      if (voucherExist.status !== 'active')
        throw createError.NotAcceptable('The coupon is no longer active.');

      if (voucherExist.endDate < Date.now() || voucherExist.usesPerCoupon === 0)
        throw createError.NotAcceptable('Coupon has expired');

      userExist.voucherItems.unshift({ coupon: result });

      await User.updateOne(
        { _id: req.payload.userId },
        { voucherItems: userExist.voucherItems }
      );

      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const result = await updatePasswordSchema.validateAsync(req.body);

      const isMatch = await doesExist.isValidPassword(result.password);

      if (!isMatch) throw createError.Unauthorized('Password incorrect.');

      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(
        result.newPassword,
        saltRounds
      );
      await User.updateOne(
        { _id: req.payload.userId },
        { password: hashedNewPassword, updatedAt: Date.now() }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const result = await profileSchema.validateAsync(req.body);

      const doesExist = await User.findById(req.payload.userId);
      if (!doesExist) throw createError.NotFound('User does not exist.');
      if (doesExist.verified === false)
        throw createError.NotAcceptable('User does not verify.');

      await User.updateOne(
        { _id: req.payload.userId },
        { ...result, updatedAt: Date.now() }
      );

      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getUserDetail: async (req, res, next) => {
    try {
      const doesExist = await User.findById(req.params.id);

      if (!doesExist) throw createError.NotFound('User does not exist.');

      res.status(200).json({ user: doesExist });
    } catch (error) {
      next(error);
    }
  },

  getUserList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(User.find(), req.query)
        .search()
        .filter();
      let users = await apiFeatures.query;
      const filteredCount = users.length;
      apiFeatures.sorting().pagination();
      users = await apiFeatures.query.clone();

      res.status(200).json({ filteredCount, users });
    } catch (error) {
      next(error);
    }
  },
};
