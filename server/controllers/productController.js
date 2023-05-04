const Product = require('../models/productModel');
const Author = require('../models/authorModel');
const Category = require('../models/categoryModel');
const APIFeatures = require('../utils/apiFeatures');
const client = require('../helpers/initRedis');
const slug = require('slug');
const createError = require('http-errors');
const { productSchema } = require('../utils/validationSchema');

module.exports = {
  createProduct: async (req, res, next) => {
    try {
      const result = await productSchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await Product.findOne({ slug: slugGenerator });

      if (slugExist)
        throw createError.Conflict(`${slugGenerator}is already been existed.`);

      const product = new Product({
        ...result,
        slug: slugGenerator,
        user: req.payload.userId,
      });
      const savedProduct = await product.save();

      res.status(201).json({
        success: true,
        product: savedProduct,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const doesExist = await Product.findOne({ slug: req.params.slug });

      if (!doesExist) throw createError.NotFound('Product does not exist.');

      const result = await productSchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await Product.find({ slug: slugGenerator });

      if (slugExist.filter((product) => product.slug !== req.params.slug) > 0)
        throw createError.Conflict(`${slugGenerator} is already been existed.`);

      await Product.updateOne(
        { slug: req.params.sulg },
        {
          ...result,
          user: req.payload.userId,
          slug: slugGenerator,
          updatedAt: Date.now(),
        }
      );

      res.status(200).json({
        success: true,
        slug: slugGenerator,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getProductDetail: async (req, res, next) => {
    try {
      const doesExist = await Product.findOne({ slug: req.params.slug });

      if (!doesExist) throw createError.NotFound('Product does not exist.');

      res.status(200).json({
        success: true,
        product: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getProductList: async (req, res, next) => {
    try {
      const { category, author } = req.query;
      if (category !== undefined) {
        categoryExist = await Category.findOne({ slug: category });
        req.query.category = categoryExist._id;
      }

      if (author !== undefined) {
        authorExist = await Author.findOne({ slug: author });
        req.query.author = authorExist._id;
      }

      const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();
      let products = await apiFeatures.query;
      const filteredCount = products.length;
      apiFeatures.sorting().pagination();
      products = await apiFeatures.query.clone();

      res.status(200).json({
        success: true,
        filteredCount,
        products,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const doesExist = await Product.findById(req.params.id);

      if (!doesExist) throw createError.NotFound('Product does not exist.');

      await Product.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
