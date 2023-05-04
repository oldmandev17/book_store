const express = require('express');
const router = express.Router();

const {
  register,
  verifyEmail,
  verified,
  login,
  refreshToken,
  logout,
  requestPasswordReset,
  resetPassword,
} = require('../controllers/authController');

router.route('/register').post(register);
router.route('/verify/:userId/:uniqueString').get(verifyEmail);
router.route('/verified').get(verified);
router.route('/login').post(login);
router.route('/refresh-token').post(refreshToken);
router.route('/logout').delete(logout);
router.route('/requestPasswordReset').post(requestPasswordReset);
router.route('/resetPassword').post(resetPassword);

module.exports = router;