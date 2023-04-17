const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({});

module.exports = mongoose.model('coupon', couponSchema);