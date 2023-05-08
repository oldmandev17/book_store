const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: [true, 'Please enter the order status.'],
    enum: {
      values: ['pending', 'processed', 'delivering', 'completed', 'canceled'],
      message: 'Please select the correct status for this order',
    },
  },
  coupon: {
    type: String,
  },
  payment: {
    id: {
      type: String,
    },
    method: {
      type: String,
      required: [true, 'Please enter the payment method for this order.'],
      enum: {
        values: ['cash by delivery', 'pay by bank', 'pay by momo'],
        message: 'Please select the correct payment method for this order',
      },
    },
  },
  shipping: {
    name: {
      type: String,
      required: [true, 'Please enter the customer name for this order.'],
    },
    phone: {
      type: String,
      required: [true, 'Please enter the customer phone for this order.'],
    },
    address: {
      type: String,
      required: [true, 'Please enter the address for this order.'],
    },
    fee: {
      type: Number,
      required: [true, 'Please enter the fee for this order.'],
    },
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: [true, 'Please enter the product id.'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please enter the product quantity.'],
      },
      price: {
        type: Number,
        required: [true, 'Please enter the product price.'],
      },
      discount: {
        type: Number,
        default: 0,
      },
    },
  ],
  total: {
    type: Number,
    required: [true, 'Please enter the total money for this order.'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Please enter the user id for this order'],
  },
  createdAt: {
    type: Date,
  },
  deliveryAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  canceledAt: {
    type: Date,
  },
});

module.exports = mongoose.model('order', orderSchema);
