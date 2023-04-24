const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/jwtHelper');
const {
  createParentCategory,
  getParentCategoryDetail,
  getParentCategoryList,
  updateParentCategory,
  deleteParentCategory,
} = require('../controllers/parentCategoryController');

router.route('/create').post(verifyAccessToken, createParentCategory);
router.route('/:slug').get(getParentCategoryDetail);
router.route('/').get(getParentCategoryList);
router.route('/update/:slug').put(verifyAccessToken, updateParentCategory);
router.route('/delete/:id').delete(verifyAccessToken, deleteParentCategory);

module.exports = router;
