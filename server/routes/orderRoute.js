const express = require('express');
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  createOrder,
  cancelOrder,
  getOrderDetail,
  getOrderList,
  deleteOrder,
  updateStatusOrder,
} = require('../controllers/orderController');
const router = express.Router();

router.route('/create').post(verifyAccessToken, createOrder);
router
  .route('admin/update-status/:id')
  .put(verifyAccessToken, authorizeRoles('admin'), updateStatusOrder);
router.route('/cancel/:id').put(verifyAccessToken, cancelOrder);
router.route('/get-detail/:id').get(verifyAccessToken, getOrderDetail);
router
  .route('/get-list')
  .get(verifyAccessToken, authorizeRoles('admin'), getOrderList);
router
  .route('/delete/:id')
  .delete(verifyAccessToken, authorizeRoles('admin'), deleteOrder);

module.exports = router;
