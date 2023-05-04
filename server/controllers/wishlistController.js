const Product = require('../models/productModel');
const Wishlist = require('../models/wishlistModel');
const client = require('../helpers/initRedis');
const createError = require('http-errors');

module.exports = {
  editItemWishlist: async (req, res, next) => {
    try {
      const productExist = await Product.findById(req.params.id);

      if (!productExist) throw createError.NotFound('Product does not exist.');

      const wishlistExist = await Wishlist.findOne({
        user: req.payload.userId,
      });

      if (!wishlistExist)
        await Wishlist.create({
          user: req.payload.userId,
          wishlistItems: [
            {
              product: req.params.id,
            },
          ],
        });
      else {
        const productWishlistExist = wishlistExist.wishlistItems.filter(
          (product) => product.product.toString() === req.params.id
        );

        if (productWishlistExist.length > 0) {
          const newWishlistItems = wishlistExist.wishlistItems.filter(
            (product) => product.product.toString() !== req.params.id
          );
          await Wishlist.updateOne(
            { user: req.payload.userId },
            { wishlistItems: newWishlistItems }
          );
        } else {
          wishlistExist.wishlistItems.unshift({
            product: req.params.id,
          });
          await wishlistExist.save({ validateBeforeSave: true });
        }
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  getWishlistDetail: async (req, res, next) => {
    try {
      const doesExist = await Wishlist.findOne({ user: req.payload.userId });

      if (!doesExist) throw createError.NotFound('Product does not exist.');

      res.status(200).json({ wishlist: doesExist });
    } catch (error) {
      next(error);
    }
  },
};
