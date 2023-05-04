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

module.exports = router;
