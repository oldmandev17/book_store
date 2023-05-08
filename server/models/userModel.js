const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the user name.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter the user email.'],
    lowercase: [true, 'The user email must be a lowercase.'],
    unique: [true, 'The user email must be a unique.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter the user password.'],
  },
  verified: {
    type: Boolean,
    default: false,
    required: [true, 'Please enter the user verified.'],
  },
  phone: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Please select the correct gender for this user.',
    },
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Please enter the user role.'],
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: 'Please select the correct role for this user.',
    },
  },
  deliveryAddressItems: [
    {
      name: {
        type: String,
        required: [
          true,
          'Please enter the user name for this delivery address.',
        ],
      },
      phone: {
        type: String,
        required: [
          true,
          'Please enter the user phone for this delivery address.',
        ],
      },
      address: {
        type: String,
        required: [true, 'Please enter the address for this delivery address.'],
      },
      default: {
        type: Boolean,
        default: false,
      },
    },
  ],
  voucherItems: [
    {
      coupon: {
        type: String,
        length: [8, 'The coupon must be length eight'],
        required: [true, 'Please select the coupon for this voucher'],
      },
      used: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Please select this user registration period.'],
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('user', userSchema);
