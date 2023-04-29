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

module.exports = {
  authRegisterSchema,
  authLoginSchema,
  authorSchema,
  parentCategorySchema,
  categorySchema,
  productSchema,
  couponSchema,
};
