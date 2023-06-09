const Category = require('../models/categoryModel');
const ParentCategory = require('../models/parentCategoryModel');
const Product = require('../models/productModel');
const client = require('../helpers/initRedis');
const slug = require('slug');
const createError = require('http-errors');
const APIFeatures = require('../utils/apiFeatures');
const { categorySchema, statusSchema } = require('../utils/validationSchema');

module.exports = {
  createCategory: async (req, res, next) => {
    try {
      const result = await categorySchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await Category.findOne({ slug: slugGenerator });
      const parentCategoryExist = await ParentCategory.findById(
        result.parentCategory
      );

      if (slugExist)
        throw createError.Conflict(`${slugGenerator} is already been existed.`);
      if (!parentCategoryExist)
        throw createError.NotFound('Parent category does not exist.');

      const category = new Category({
        ...result,
        slug: slugGenerator,
        user: req.payload.userId,
      });
      const savedCategory = await category.save();

      res.status(201).json({
        category: savedCategory,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getCategoryDetail: async (req, res, next) => {
    try {
      const doesExist = await Category.findOne({ slug: req.params.slug });

      if (!doesExist) throw createError.NotFound('Category does not exist.');

      res.status(200).json({
        category: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getCategoryList: async (req, res, next) => {
    try {
      const { parentCategory } = req.query;
      if (parentCategory !== undefined) {
        const parentCategoryExist = await ParentCategory.findOne({
          slug: parentCategory,
        });
        req.query.parentCategory = parentCategoryExist._id;
      }

      const apiFeatures = new APIFeatures(Category.find(), req.query)
        .search()
        .filter();
      let categories = await apiFeatures.query;
      const filteredCount = categories.length;
      apiFeatures.sorting().pagination();
      categories = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        categories,
      });
    } catch (error) {
      next(error);
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const doesExist = await Category.findOne({ slug: req.params.slug });

      if (!doesExist) throw createError.NotFound('Category does not exist.');

      const result = await categorySchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await Category.find({ slug: slugGenerator });
      const parentCategoryExist = await ParentCategory.findById(
        result.parentCategory
      );

      if (
        slugExist.filter((category) => category.slug !== req.params.slug)
          .length > 0
      )
        throw createError.Conflict(`${slugGenerator} is already been existed.`);
      if (!parentCategoryExist)
        throw createError.NotFound('Parent category does not exist.');

      await Category.updateOne(
        { slug: req.params.slug },
        {
          ...result,
          user: req.payload.userId,
          slug: slugGenerator,
          updatedAt: Date.now(),
        }
      );

      res.status(200).json({
        slug: slugGenerator,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const doesExist = await Category.findById(req.params.id);

      if (!doesExist) throw createError.NotFound('Category does not exist.');

      const products = await Product.find({ category: req.params.id });

      if (products.length > 0)
        throw createError.Conflict(`${doesExist.name} does not delete.`);

      await Category.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  updateStatusCategory: async (req, res, next) => {
    try {
      const result = await statusSchema.validateAsync(req.params.status);
      for (let category of req.body.categories) {
        const doesExist = await Category.findById(category.id);
        if (!doesExist) throw createError.NotFound('Category does not exist');
      }
      req.body.categories.forEach(async (category) => {
        await Category.updateOne(
          { _id: category.id },
          { status: result, updatedAt: Date.now() }
        );
      });
      res.status(200).send();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
