function handleError(res, error) {
  let statusCode = 500;

  const errorMap = {
    CATEGORY_ALREADY_EXISTS: 409,
    CATEGORY_NOT_FOUND: 404,
    CREATE_CATEGORY_FAILED: 400,
    UPDATE_CATEGORY_FAILED: 400,
    DELETE_CATEGORY_FAILED: 400,
    SOFT_DELETE_CATEGORY_FAILED: 400,
    FETCH_CATEGORY_BY_ID_FAILED: 400,
    FETCH_CATEGORY_BY_SLUG_FAILED: 400,
    FETCH_CATEGORIES_FAILED: 400,
  };

  statusCode = errorMap[error.code] || 500;

  res.status(statusCode).json({
    success: false,
    code: error.code || "INTERNAL_SERVER_ERROR",
    message: error.message || "Something went wrong",
  });
}

module.exports = handleError;
