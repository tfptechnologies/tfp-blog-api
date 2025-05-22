module.exports = function validate(schema, type = 'body') {
  return (req, res, next) => {
    const dataToValidate = type === 'body' ? req.body : req.params;
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      });
    }

    next();
  };
};
