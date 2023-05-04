const Author = require('../models/authorModel');
const Product = require('../models/productModel');
const createError = require('http-errors');
const APIFeatures = require('../utils/apiFeatures');
const client = require('../helpers/initRedis');
const slug = require('slug');
const { authorSchema } = require('../utils/validationSchema');

module.exports = {
  createAuthor: async (req, res, next) => {
    try {
      const result = await authorSchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await Author.findOne({ slug: slugGenerator });

      if (slugExist)
        throw createError.Conflict(`${slugGenerator} is already been existed.`);

      const author = new Author({
        ...result,
        slug: slugGenerator,
        user: req.payload.userId,
      });
      const savedAuthor = await author.save();

      res.status(201).json({
        author: savedAuthor,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  getAuthorDetail: async (req, res, next) => {
    try {
      const doesExist = await Author.findOne({ slug: req.params.slug });

      if (!doesExist) throw createError.NotFound('Author does not exist.');

      res.status(200).json({
        author: doesExist,
      });
    } catch (error) {
      next(error);
    }
  },

  getAuthorList: async (req, res, next) => {
    try {
      const apiFeatures = new APIFeatures(Author.find(), req.query)
        .search()
        .filter();
      let authors = await apiFeatures.query;
      const filteredCount = authors.length;
      apiFeatures.sorting().pagination();
      authors = await apiFeatures.query.clone();

      res.status(200).json({
        filteredCount,
        authors,
      });
    } catch (error) {
      next(error);
    }
  },

  updateAuthor: async (req, res, next) => {
    try {
      const doesExist = await Author.findOne({ slug: req.params.slug });

      if (!doesExist) throw createError.NotFound('Author does not exist.');

      const result = await authorSchema.validateAsync(req.body);
      const slugGenerator = slug(result.name);
      const slugExist = await Author.find({ slug: slugGenerator });

      if (
        slugExist.filter((author) => author.slug !== req.params.slug).length > 0
      )
        throw createError.Conflict(`${slugGenerator} is already been existed.`);

      await Author.updateOne(
        { slug: req.params.slug },
        {
          ...result,
          user: req.payload.userId,
          slug: slugGenerator,
          updatedAt: Date.now(),
        }
      );

      res.status(200).json({
        author: slugGenerator,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  deleteAuthor: async (req, res, next) => {
    try {
      const doesExist = await Author.findById(req.params.id);

      if (!doesExist) throw createError.NotFound('Author does not exist.');

      const products = await Product.find({ author: req.params.id });

      if (products.length > 0)
        throw createError.Conflict(`${doesExist.name} does not delete.`);

      await Author.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
