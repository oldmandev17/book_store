const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const { createCoupon } = require('../controllers/couponController');

router.route('/create').post(createCoupon);

module.exports = router;
