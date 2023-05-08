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
  getProfile,
  addDeliveryAddress,
  removeDeliveryAddress,
  addVoucher,
  updateDeliveryAddress,
  updateDefaultDeliveryAddress,
  updatePassword,
  updateProfile,
  getUserDetail,
  getUserList,
} = require('../controllers/authController');
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');

router.route('/register').post(register);
router.route('/verify/:userId/:uniqueString').get(verifyEmail);
router.route('/verified/:userId/:loginString').get(verified);
router.route('/login').post(login);
router.route('/refresh-token').post(refreshToken);
router.route('/logout/:refreshToken').delete(logout);
router.route('/requestPasswordReset').post(requestPasswordReset);
router.route('/resetPassword').post(resetPassword);
router.route('/me').get(verifyAccessToken, getProfile);
router.route('/address/add').post(verifyAccessToken, addDeliveryAddress);
router
  .route('/address/remove/:id')
  .delete(verifyAccessToken, removeDeliveryAddress);
router
  .route('/address/update/:id')
  .put(verifyAccessToken, updateDeliveryAddress);
router
  .route('/address/update-default/:id')
  .put(verifyAccessToken, updateDefaultDeliveryAddress);
router.route('/voucher/add/:voucher').post(verifyAccessToken, addVoucher);
router.route('/update-password').put(verifyAccessToken, updatePassword);
router.route('/update-profile').put(verifyAccessToken, updateProfile);
router
  .route('/admin/user-detail/:id')
  .get(verifyAccessToken, authorizeRoles('admin'), getUserDetail);
router
  .route('/admin/user-list')
  .get(verifyAccessToken, authorizeRoles('admin'), getUserList);

module.exports = router;
