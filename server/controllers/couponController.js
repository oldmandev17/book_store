const Coupon = require('../models/couponModel');
const client = require('../helpers/initRedis');
const createError = require('http-errors');
const { couponSchema } = require('../utils/validationSchema');
const voucherCode = require('voucher-code-generator');
const APIFeature = require('../utils/apiFeatures');
const CronJob = require('cron').CronJob;

const job = new CronJob('* * * * * *', async function () {
  try {
    const coupons = await Coupon.find();
    for (let coupon of coupons) {
      if (coupon.endDate < Date.now())
        await Coupon.updateOne(
          { code: coupon.code },
          { status: 'expires', updatedAt: Date.now() }
        );
    }
  } catch (error) {
    console.log(error);
  }
});
job.start();

module.exports = {
  createCoupon: async (req, res, next) => {
    try {
      const result = await couponSchema.validateAsync(req.body);
      let codeGenerator = '';
      let codeExist = {};
      do {
        codeGenerator = voucherCode.generate().toString();
        codeExist = await Coupon.findOne({ code: codeGenerator });
      } while (codeExist !== null);

      const coupon = new Coupon({
        ...result,
        code: codeGenerator,
        user: req.payload.userId,
      });
      const savedCoupon = await coupon.save();

      res.status(201).json({
        coupon: savedCoupon,
      });
    } catch (error) {
      if (error.isJoi === true) error.status === 422;
      next(error);
    }
  },

  updateCoupon: async (req, res, next) => {
    try {
      const doesExist = await Coupon.findOne({ code: req.params.code });

      if (!doesExist) throw createError.NotFound('Coupon does not exist.');

      const result = await couponSchema.validateAsync(req.body);

      await Coupon.updateOne(
        { code: req.params.code },
        {
          ...result,
          user: req.payload.userId,
          updatedAt: Date.now(),
        }
      );

      res.status(200).json({
        code: req.params.code,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getCouponDetail: async (req, res, next) => {
    try {
      const doesExist = await Coupon.findOne({ code: req.params.code });

      if (!doesExist) throw createError.NotFound('Coupon does not exist.');

      res.status(200).json({
        coupon: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getCouponList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeature(Coupon.find(), req.query)
        .search()
        .filter();
      let coupons = await apiFeatures.query;
      const filteredCount = coupons.length;
      apiFeatures.sorting().pagination();
      coupons = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        coupons,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteCoupon: async (req, res, next) => {
    try {
      const doesExist = await Coupon.findById(req.params.id);

      if (!doesExist) throw createError.NotFound('Coupon does not exist.');

      await Coupon.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
