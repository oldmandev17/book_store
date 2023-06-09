const ParentCategory = require('../models/parentCategoryModel');
const Category = require('../models/categoryModel');
const createError = require('http-errors');
const APIFeatures = require('../utils/apiFeatures');
const client = require('../helpers/initRedis');
const slug = require('slug');
const {
  parentCategorySchema,
  statusSchema,
} = require('../utils/validationSchema');

module.exports = {
  createParentCategory: async (req, res, next) => {
    try {
      const result = await parentCategorySchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await ParentCategory.findOne({ slug: slugGenerator });

      if (slugExist)
        throw createError.Conflict(`${slugGenerator} is elready been existed.`);

      const parentCategory = new ParentCategory({
        ...result,
        slug: slugGenerator,
        user: req.payload.userId,
      });
      const savedParentCategory = await parentCategory.save();

      res.status(201).json({
        parentCategory: savedParentCategory,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getParentCategoryDetail: async (req, res, next) => {
    try {
      const doesExist = await ParentCategory.findOne({ slug: req.params.slug });

      if (!doesExist)
        throw createError.NotFound('Parent category does not exist.');
      res.status(200).json({
        parentCategory: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getParentCategoryList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(ParentCategory.find(), req.query)
        .search()
        .filter();
      let parentCategories = await apiFeatures.query;
      const filteredCount = parentCategories.length;
      apiFeatures.sorting().pagination();
      parentCategories = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        parentCategories,
      });
    } catch (error) {
      next(error);
    }
  },

  updateParentCategory: async (req, res, next) => {
    try {
      const doesExist = await ParentCategory.findOne({ slug: req.params.slug });

      if (!doesExist)
        throw createError.NotFound('Parent category does not exist.');

      const result = await parentCategorySchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await ParentCategory.find({ slug: slugGenerator });

      if (
        slugExist.filter((parent) => parent.slug !== req.params.slug).length > 0
      )
        throw createError.Conflict(`${slugGenerator} is already been existed.`);

      await ParentCategory.updateOne(
        { slug: req.params.slug },
        {
          ...result,
          user: req.payload.userId,
          slug: slugGenerator,
          updatedAt: Date.now(),
        }
      );

      res.status(200).json({
        parentCategory: slugGenerator,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  deleteParentCategory: async (req, res, next) => {
    try {
      const doesExist = await ParentCategory.findById(req.params.id);

      if (!doesExist)
        throw createError.NotFound('Parent category does not exist.');

      const categories = await Category.find({ parentCategory: req.params.id });

      if (categories.length > 0)
        throw createError.Conflict(`${doesExist.name} does not delete.`);

      await ParentCategory.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  updateStatusParentCategory: async (req, res, next) => {
    try {
      const result = await statusSchema.validateAsync(req.params.status);
      for (let parentCategory of req.body.parentCategories) {
        const doesExist = await ParentCategory.findById(parentCategory.id);
        if (!doesExist) {
          throw createError.NotFound('Parent category does not exist.');
        }
      }
      req.body.parentCategories.forEach(async (parentCategory) => {
        await ParentCategory.updateOne(
          { _id: parentCategory.id },
          { status: result }
        );
      });
      res.status(200).json();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
