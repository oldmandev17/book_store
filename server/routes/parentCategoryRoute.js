const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  createParentCategory,
  getParentCategoryDetail,
  getParentCategoryList,
  updateParentCategory,
  deleteParentCategory,
  updateStatusParentCategory,
} = require('../controllers/parentCategoryController');

router
  .route('/admin/create')
  .post(verifyAccessToken, authorizeRoles('admin'), createParentCategory);
router.route('/:slug').get(getParentCategoryDetail);
router.route('/').get(getParentCategoryList);
router
  .route('/admin/update/:slug')
  .put(verifyAccessToken, authorizeRoles('admin'), updateParentCategory);
router
  .route('/admin/delete/:id')
  .delete(verifyAccessToken, authorizeRoles('admin'), deleteParentCategory);
router
  .route('/admin/update-status/:status')
  .put(verifyAccessToken, authorizeRoles('admin'), updateStatusParentCategory);

module.exports = router;
