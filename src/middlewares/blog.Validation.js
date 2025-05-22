const { blogValidation } = require('../validators/blog.validator');

const validateBlog = (req, res, next) => {
  const { error } = blogValidation.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(err => err.message);
    return res.status(400).json({ errors: messages });
  }

  next();
};

module.exports = validateBlog;
