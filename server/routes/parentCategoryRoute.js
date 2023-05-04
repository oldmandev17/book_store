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

module.exports = router;
