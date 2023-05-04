const Joi = require('@hapi/joi');

const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const authLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const authorSchema = Joi.object({
  name: Joi.string().required(),
  introduction: Joi.string().required(),
  image: Joi.string().required(),
});

const parentCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string().required(),
  status: Joi.string().required().valid('active', 'inactive'),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  image: Joi.string().required(),
  status: Joi.string().required().valid('active', 'inactive'),
  parentCategory: Joi.string().required(),
});

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().default(0),
  quantity: Joi.number().required(),
  status: Joi.string().required().valid('active', 'inactive'),
  featured: Joi.string().required().valid('featured', 'featureless'),
  imageItems: Joi.array().items({
    url: Joi.string().required(),
  }),
  category: Joi.string().required(),
  author: Joi.string().required(),
});

const couponSchema = Joi.object({
  type: Joi.string().required().valid('percent', 'fixed_amount'),
  value: Joi.number().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  minSpend: Joi.number().required(),
  maxSpend: Joi.number().required(),
  usesPerCustomer: Joi.number().required(),
  usesPerCoupon: Joi.number().required(),
  status: Joi.string().required().valid('active', 'expires', 'disable'),
});

const statusSchema = Joi.string().required().valid('active', 'inactive');

const addressSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  default: Joi.boolean().required(),
});

const voucherSchema = Joi.string().length(8).required();

const updatePasswordSchema = Joi.object({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const profileSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  birthday: Joi.date(),
  gender: Joi.string().valid('male', 'female', 'other'),
  avatar: Joi.string(),
});

const featuredSchema = Joi.string().required().valid('featured', 'featureless');

const reviewSchema = Joi.object({
  user: Joi.string().required(),
  content: Joi.string().required(),
  imageReviewItems: Joi.array().items({
    url: Joi.string().required(),
  }),
  rating: Joi.number().required().default(5),
});

const orderSchema = Joi.object({
  coupon: Joi.string(),
  payment: Joi.object({
    method: Joi.string()
      .required()
      .valid('cash by delivery', 'pay by bank', 'pay by momo')
      .default('cash by delivery'),
  }),
  shipping: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    fee: Joi.number().required(),
  }),
  orderItems: Joi.array().items({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().default(0),
  }),
  total: Joi.number().required(),
});

module.exports = {
  authRegisterSchema,
  authLoginSchema,
  authorSchema,
  parentCategorySchema,
  categorySchema,
  productSchema,
  couponSchema,
  statusSchema,
  addressSchema,
  voucherSchema,
  updatePasswordSchema,
  profileSchema,
  featuredSchema,
  reviewSchema,
  orderSchema,
};
