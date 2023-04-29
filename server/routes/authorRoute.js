const express = require('express');
const router = express.Router();
const {
  verifyAccessToken,
  authorizeRoles,
} = require('../middlewares/jwtHelper');
const {
  createAuthor,
  getAuthorDetail,
  updateAuthor,
  deleteAuthor,
  getAuthorList,
} = require('../controllers/authorController');

router
  .route('/admin/create')
  .post(verifyAccessToken, authorizeRoles('admin'), createAuthor);
router.route('/:slug').get(getAuthorDetail);
router.route('/').get(getAuthorList);
router
  .route('/admin/update/:slug')
  .put(verifyAccessToken, authorizeRoles('admin'), updateAuthor);
router
  .route('/admin/delete/:id')
  .delete(verifyAccessToken, authorizeRoles('admin'), deleteAuthor);

module.exports = router;
