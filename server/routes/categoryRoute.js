const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  createCategory,
  updateCategory,
  getCategoryDetail,
  getCategoryList,
  deleteCategory,
  updateStatusCategory,
} = require('../controllers/categoryController');

router
  .route('/admin/create')
  .post(verifyAccessToken, authorizeRoles('admin'), createCategory);
router.route('/:slug').get(getCategoryDetail);
router.route('/').get(getCategoryList);
router
  .route('/admin/update/:slug')
  .put(verifyAccessToken, authorizeRoles('admin'), updateCategory);
router
  .route('/admin/delete/:id')
  .delete(verifyAccessToken, authorizeRoles('admin'), deleteCategory);
router
  .route('/admin/update-status/:status')
  .put(verifyAccessToken, authorizeRoles('admin'), updateStatusCategory);

module.exports = router;
