const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  createCoupon,
  updateCoupon,
  getCouponDetail,
  getCouponList,
  deleteCoupon,
} = require('../controllers/couponController');

router
  .route('/admin/create')
  .post(verifyAccessToken, authorizeRoles('admin'), createCoupon);
router
  .route('/admin/update/:code')
  .put(verifyAccessToken, authorizeRoles('admin'), updateCoupon);
router.route('/').get(getCouponList);
router.route('/:code').get(getCouponDetail);
router
  .route('/admin/delete/:id')
  .delete(verifyAccessToken, authorizeRoles('admin'), deleteCoupon);

module.exports = router;
