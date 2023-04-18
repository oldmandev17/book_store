const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: [true, 'Please enter the coupon code.'],
    unique: [true, 'The coupon code must be unique.'],
  },
  couponType: {
    type: String,
    required: [true, 'Please select the type for this coupon.'],
    enum: {
      values: ['percent', 'fixed_amount'],
      message: 'Please select the correct type for this coupon.',
    },
  },
  couponValue: {
    type: Number,
    required: [true, 'Please enter the coupon valuez.'],
  },
  couponStartDate: {
    type: Date,
    required: [true, 'Please select a time to start this coupon.'],
  },
  couponEndDate: {
    type: Date,
    required: [true, 'Please select a time to end this coupon.'],
  },
  couponMinSpend: {
    type: Number,
    required: [true, 'Please enter the money minimum to use this coupon.'],
  },
});

module.exports = mongoose.model('coupon', couponSchema);
