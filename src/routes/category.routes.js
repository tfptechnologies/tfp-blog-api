const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const roleCheck = require("../middlewares/role.middleware");
const {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
} = require("../validators/category.validator");

// Create
router.post(
  "/",
  validate(createCategorySchema),
  categoryController.createCategory
);

// Get by ID
router.get(
  "/:id",
  validate(categoryIdParamSchema, "params"),
  categoryController.getCategoryById
);

// Update
router.put(
  "/:id",
  validate(categoryIdParamSchema, "params"),
  validate(updateCategorySchema),
  categoryController.updateCategory
);

// Delete
router.delete(
  "/:id",
  validate(categoryIdParamSchema, "params"),
  categoryController.softDeleteCategory
);


//Get All Categories
router.get("/", categoryController.getAllCategories);

module.exports = router;
