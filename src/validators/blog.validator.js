// validators/blog.validator.js
const Joi = require('joi');

const validateBody = require('../middlewares/validate.middleware');

// Define validation schemas

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  slug: Joi.string().min(3).max(255).required(),
  content: Joi.string().required(),
  metaTitle: Joi.string().max(255).optional(),
  metaDescription: Joi.string().max(512).optional(),
  canonicalUrl: Joi.string().uri().optional(),
  excerpt: Joi.string().max(512).optional(),
  authorId: Joi.string().uuid().required(),
  isPublished: Joi.boolean().optional(),
  status: Joi.string().valid('draft', 'posted', 'pending', 'approved', 'rejected').optional(),
  readingTime: Joi.number().integer().optional(),
  views: Joi.number().integer().optional(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  slug: Joi.string().min(3).max(255).optional(),
  content: Joi.string().optional(),
  metaTitle: Joi.string().max(255).optional(),
  metaDescription: Joi.string().max(512).optional(),
  canonicalUrl: Joi.string().uri().optional(),
  excerpt: Joi.string().max(512).optional(),
  isPublished: Joi.boolean().optional(),
  status: Joi.string().valid('draft', 'posted', 'pending', 'approved', 'rejected').optional(),
  readingTime: Joi.number().integer().optional(),
  views: Joi.number().integer().optional(),
}).min(1); // at least one field required for update


module.exports = {
  validateCreateBlog: validateBody(createBlogSchema),
  validateUpdateBlog: validateBody(updateBlogSchema),
};
