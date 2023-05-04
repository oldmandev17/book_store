const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../middlewares/jwtHelper');
const {
  editItemWishlist,
  getWishlistDetail,
} = require('../controllers/wishlistController');

router.route('/edit/:id').put(verifyAccessToken, editItemWishlist);
router.route('/').get(verifyAccessToken, getWishlistDetail);

module.exports = router;
