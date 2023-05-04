const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  createProduct,
  updateProduct,
  getProductDetail,
  getProductList,
  deleteProduct,
  updateStatusProduct,
  updateFeaturedProduct,
} = require('../controllers/productController');

router
  .route('/admin/create')
  .post(verifyAccessToken, authorizeRoles('admin'), createProduct);
router.route('/:slug').get(getProductDetail);
router.route('/').get(getProductList);
router
  .route('/admin/update/:slug')
  .put(verifyAccessToken, authorizeRoles('admin'), updateProduct);
router
  .route('/admin/delete/:id')
  .delete(verifyAccessToken, authorizeRoles('admin'), deleteProduct);
router
  .route('/admin/update-status/:status')
  .put(verifyAccessToken, authorizeRoles('admin'), updateStatusProduct);
router
  .route('/admin/update-featured/:featured')
  .put(verifyAccessToken, authorizeRoles('admin'), updateFeaturedProduct);

module.exports = router;
