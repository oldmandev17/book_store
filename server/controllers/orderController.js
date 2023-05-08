const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Coupon = require('../models/couponModel');
const Cart = require('../models/cartModel');
const APIFeatures = require('../utils/apiFeatures');
const client = require('../helpers/initRedis');
const createError = require('http-errors');
const { orderSchema, orderStatusSchema } = require('../utils/validationSchema');

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const result = await orderSchema.validateAsync(req.body);
      const couponExist = await Coupon.findOne({ code: result.coupon });

      if (!couponExist) throw createError.NotFound('Coupon does not exist.');

      if (
        couponExist.endDate < Date.now() ||
        couponExist.usesPerCoupon === 0 ||
        couponExist.status !== 'active'
      )
        throw createError.NotAcceptable('The coupon has expired.');

      const couponUsedPerCustomer = await Order.find({
        user: req.payload.userId,
        coupon: result.coupon,
      });

      if (couponUsedPerCustomer.length >= couponExist.usesPerCustomer)
        throw createError.NotAcceptable('You have expired to use this coupon.');

      if (result.total < couponExist.minSpend)
        throw createError.NotAcceptable(
          'Order value is not enough to apply this coupon.'
        );
      for (let product of result.orderItems) {
        const doesExist = await Product.findById(product.product);
        if (!doesExist) throw createError.NotFound('Product does not exist.');
        if (doesExist.status !== 'active')
          throw createError.NotAcceptable('The product is no longer active.');
        if (doesExist.quantity < product.quantity)
          throw createError.NotAcceptable('Product quantity is not enough.');
      }

      const cartExist = await Cart.findOne({ user: req.payload.userId });
      let newCartItems = [];

      result.orderItems.forEach(async (product) => {
        const productExist = await Product.findById(product.product);

        await Product.updateOne(
          { _id: product.product },
          {
            sold: productExist.sold + product.quantity,
            quantity: productExist.quantity - product.quantity,
            status:
              productExist.quantity - product.quantity <= 0
                ? 'inactive'
                : 'active',
            updatedAt: Date.now(),
          }
        );

        if (cartExist) {
          newCartItems = cartExist.cartItems.filter(
            (productCart) =>
              productCart.product.toString() !== product.product.toString()
          );
        }
      });

      newCartItems.sort((a, b) => b.createdAt - a.createdAt);

      await Cart.updateOne(
        { user: req.payload.userId },
        {
          cartItems: newCartItems,
          udpatedAt: Date.now(),
        }
      );

      await Coupon.updateOne(
        { code: result.coupon },
        {
          usesPerCoupon: couponExist.usesPerCoupon - 1,
          status: couponExist.usesPerCoupon - 1 <= 0 ? 'disable' : 'active',
          updatedAt: Date.now(),
        }
      );

      const userExist = await User.findOne({ _id: req.payload.userId });

      for (let voucher of userExist.voucherItems) {
        if (voucher.coupon === result.coupon) {
          voucher.used++;
        }
      }

      await User.updateOne(
        { _id: req.payload.userId },
        {
          voucherItems: userExist.voucherItems,
          updatedAt: Date.now(),
        }
      );

      await Order.create({
        ...result,
        status: 'pending',
        user: req.payload.userId,
      });

      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  updateStatusOrder: async (req, res, next) => {
    try {
      const result = await orderStatusSchema.validateAsync(req.body);

      const orderExist = await Order.findOne({ _id: req.params.id });

      if (!orderExist) throw createError.NotFound('Order does not exist.');

      if (result.status === 'processed')
        await Order.updateOne(
          { _id: req.params.id },
          { status: result.status, createdAt: Date.now() }
        );
      if (result.status === 'delivering')
        await Order.updateOne(
          { _id: req.params.id },
          { status: result.status, deliveryAt: Date.now() }
        );
      if (result.status === 'completed')
        await Order.updateOne(
          { _id: req.params.id },
          { status: result.status, completedAt: Date.now() }
        );
      if (result.status === 'canceled')
        await Order.updateOne(
          { _id: req.params.id },
          { status: result.status, canceledAt: Date.now() }
        );

      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  cancelOrder: async (req, res, next) => {
    try {
      const orderExist = await Order.findById(req.params.id);

      if (!orderExist) throw createError.NotFound('Order does not exist.');

      if (orderExist.status !== 'spending')
        throw createError.NotAcceptable('Orders cannot be canceled.');

      await Order.updateOne(
        { _id: req.params.id },
        { status: 'canceled', canceledAt: Date.now() }
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  },

  getOrderDetail: async (req, res, next) => {
    try {
      const orderExist = await Order.findById(req.params.id);

      if (!orderExist) throw createError.NotFound('Order does not exist.');

      res.status(200).json({ order: orderExist });
    } catch (error) {
      next(error);
    }
  },

  getOrderList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Order.find(), req.quey)
        .search()
        .filter();
      let orders = await apiFeatures.query;
      const filteredCount = orders.length;
      apiFeatures.sorting().pagination();
      orders = await apiFeatures.query.clone();

      res.status(200).json({ filteredCount, orders });
    } catch (error) {
      next(error);
    }
  },

  deleteOrder: async (req, res, next) => {
    try {
      const orderExist = await Order.findById(req.params.id);

      if (!orderExist) throw createError.NotFound('Order does not exist.');

      await Order.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
