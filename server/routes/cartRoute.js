const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  addItemCart,
  removeItemCart,
  getCartDetail,
} = require('../controllers/cartController');

router.route('/add/:id').post(verifyAccessToken, addItemCart);
router.route('/remove/:id').delete(verifyAccessToken, removeItemCart);
router.route('/').get(verifyAccessToken, getCartDetail);

module.exports = router;
