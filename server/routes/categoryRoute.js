const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/jwtHelper');
const {
  createCategory,
  updateCategory,
  getCategoryDetail,
  getCategoryList,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/create').post(verifyAccessToken, createCategory);
router.route('/:slug').get(getCategoryDetail);
router.route('/').get(getCategoryList);
router.route('/update/:slug').put(verifyAccessToken, updateCategory);
router.route('/delete/:id').delete(verifyAccessToken, deleteCategory);

module.exports = router;
