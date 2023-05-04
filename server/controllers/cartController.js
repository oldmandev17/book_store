const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const client = require('../helpers/initRedis');
const createError = require('http-errors');

module.exports = {
  addItemCart: async (req, res, next) => {
    try {
      const productExist = await Product.findById(req.params.id);

      if (!productExist) throw createError.NotFound('Product does not exist.');
      if (productExist.status !== 'active')
        throw createError.NotAcceptable('The product is no longer active.');

      const cartExist = await Cart.findOne({ user: req.payload.userId });
      if (!cartExist)
        await Cart.create({
          user: req.payload.userId,
          cartItems: [
            {
              product: req.params.id,
              quantity: req.body.quantity,
            },
          ],
        });
      else {
        const productCartExist = cartExist.cartItems.filter(
          (product) => product.product.toString() === req.params.id
        );
        if (productCartExist.length > 0) {
          if (
            productExist.quantity <
            req.body.quantity + productCartExist[0].quantity
          )
            throw createError.NotAcceptable('Product quantity is not enough.');
          if (productCartExist[0].quantity + req.body.quantity < 1)
            throw createError.NotAcceptable(
              'Product quantity cannot be less then one.'
            );
          productCartExist[0].quantity += req.body.quantity;
          productCartExist[0].updatedAt = Date.now();
        } else
          cartExist.cartItems.unshift({
            product: req.params.id,
            quantity: req.body.quantity,
          });
        await cartExist.save({ validateBeforeSave: true });
      }

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  removeItemCart: async (req, res, next) => {
    try {
      const productExist = await Product.findById(req.params.id);

      if (!productExist) throw createError.NotFound('Product does not exist.');

      const cartExist = await Cart.findOne({ user: req.payload.userId });
      const productCartExist = cartExist.cartItems.filter(
        (product) => product.product.toString() === req.params.id
      );

      if (productCartExist.length < 1)
        throw createError.NotFound('Product does not exist in this cart.');

      const newCartItems = cartExist.cartItems.filter(
        (product) => product.product.toString() !== req.params.id
      );
      await Cart.updateOne(
        { user: req.payload.userId },
        { cartItems: newCartItems }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  getCartDetail: async (req, res, next) => {
    try {
      const doesExist = await Cart.findOne({ user: req.payload.userId });

      if (!doesExist) throw createError.NotFound('Product does not exist.');

      res.status(200).json({ cart: doesExist });
    } catch (error) {
      next(error);
    }
  },
};
