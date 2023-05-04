const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please enter the coupon code.'],
    unique: [true, 'The coupon code must be unique.'],
  },
  type: {
    type: String,
    required: [true, 'Please enter the type for this coupon.'],
    enum: {
      values: ['percent', 'fixed_amount'],
      message: 'Please select the correct type for this coupon.',
    },
  },
  value: {
    type: Number,
    required: [true, 'Please enter the coupon value.'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please select a time to start this coupon.'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please select a time to end this coupon.'],
  },
  minSpend: {
    type: Number,
    required: [true, 'Please enter the minimum amount to use this coupon.'],
  },
  maxSpend: {
    type: Number,
    required: [
      true,
      'Please enter the maximum amount of discount when using this coupon.',
    ],
  },
  usesPerCustomer: {
    type: Number,
    required: [
      true,
      'Please enter the maximum number of coupon uses per customer.',
    ],
  },
  usesPerCoupon: {
    type: Number,
    required: [
      true,
      'Please enter the maximum number of coupon uses for the coupon itself.',
    ],
  },
  status: {
    type: String,
    required: [true, 'Please enter the coupon status.'],
    enum: {
      values: ['active', 'expires', 'disable'],
      message: 'Please select the correct status for this coupon.',
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [
      true,
      'Please select the administrator who created this coupon.',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Please select a time to create this coupon.'],
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('coupon', couponSchema);
