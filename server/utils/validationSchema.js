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
  status: Joi.string().valid('active', 'inactive'),
});

module.exports = {
  authRegisterSchema,
  authLoginSchema,
  authorSchema,
  parentCategorySchema,
};
