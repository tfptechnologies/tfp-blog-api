// validators/user.validator.js
const Joi = require('joi');



// Schema for creating a new user
const createUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  dob: Joi.date().optional(),
  phone: Joi.string().optional(),
  occupation: Joi.string().optional(),
  role: Joi.string().valid('user', 'author', 'admin').optional()
});

// Schema for updating user
const updateUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  dob: Joi.date().optional(),
  phone: Joi.string().optional(),
  occupation: Joi.string().optional(),
  role: Joi.string().valid('user', 'author', 'admin').optional()
}).min(1); // Ensure at least one field is provided for update

module.exports = {
  createUserSchema,
  updateUserSchema
};
