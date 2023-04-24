const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/jwtHelper');
const {
  createAuthor,
  getAuthorDetail,
  updateAuthor,
  deleteAuthor,
  getAuthorList,
} = require('../controllers/authorController');

router.route('/create').post(verifyAccessToken, createAuthor);
router.route('/:slug').get(getAuthorDetail);
router.route('/').get(getAuthorList);
router.route('/update/:slug').put(verifyAccessToken, updateAuthor);
router.route('/delete/:id').delete(verifyAccessToken, deleteAuthor);

module.exports = router;
