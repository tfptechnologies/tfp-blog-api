const Joi = require("joi");

// Schema for creating a category
const createCategorySchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
  }),
  slug: Joi.string().trim().required().messages({
    "string.empty": "Slug is required",
  }),
  isActive: Joi.boolean().optional(),
});

// Schema for updating a category
const updateCategorySchema = Joi.object({
  name: Joi.string().trim().optional(),
  slug: Joi.string().trim().optional(),
  isActive: Joi.boolean().optional(),
});

// Schema for validating params (ID)
const categoryIdParamSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.guid": "Invalid category ID format",
    "any.required": "Category ID is required",
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
};
