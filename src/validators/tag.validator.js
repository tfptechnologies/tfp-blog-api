
const Joi = require("joi");

const createTagSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  slug: Joi.string().min(2).max(50).required(),
});

const updateTagSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  slug: Joi.string().min(2).max(50),
}).or("name", "slug"); // At least one field is required

const validateCreateTag = (req, res, next) => {
  const { error } = createTagSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      code: "VALIDATION_ERROR",
    });
  }
  next();
};

const validateUpdateTag = (req, res, next) => {
  const { error } = updateTagSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      code: "VALIDATION_ERROR",
    });
  }
  next();
};

module.exports = {
  validateCreateTag,
  validateUpdateTag,
};
