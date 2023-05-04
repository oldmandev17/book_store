const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const APIFeatures = require('../utils/apiFeatures');
const client = require('../helpers/initRedis');
const createError = require('http-errors');
const { orderSchema } = require('../utils/validationSchema');

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const result = await orderSchema.validateAsync(req.body);

      for (let product of result.orderItems) {
        const doesExist = await Product.findById(product.product);
        if (!doesExist) throw createError.NotFound('Product does not exist.');
        if (doesExist.status !== 'active')
          throw createError.NotAcceptable('The product is no longer active.');
        if (doesExist.quantity < result.quantity)
          throw createError.NotAcceptable('Product quantity is not enough.');
      }

      result.orderItems.forEach(async (product) => {
        const productExist = await Product.findById(product.product);

        await Product.updateOne(
          { _id: product.product },
          {
            sold: productExist.sold + product.quantity,
            quantity: productExist.quantity - product.quantity,
            status:
              productExist.quantity - product.quantity === 0
                ? 'inactive'
                : 'active',
            updatedAt: Date.now(),
          }
        );
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  updateStatusOrder: async (req, res, next) => {
    try {
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getOrderDetail: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  getOrderList: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
};
