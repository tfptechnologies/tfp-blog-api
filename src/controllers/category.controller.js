const CategoryService = require('../services/category.service');
const handleError = require('../utils/errorHandler');

// Create Category
async function createCategory(req, res) {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    handleError(res, error);
  }
}

// Get All Categories
async function getAllCategories(req, res) {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    handleError(res, error);
  }
}

// Get Category by ID
async function getCategoryById(req, res) {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    handleError(res, error);
  }
}

// Get Category by Slug
async function getCategoryBySlug(req, res) {
  try {
    const category = await CategoryService.getCategoryBySlug(req.params.slug);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    handleError(res, error);
  }
}

// Update Category
async function updateCategory(req, res) {
  try {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    handleError(res, error);
  }
}

// Soft Delete Category
async function softDeleteCategory(req, res) {
  try {
    const result = await CategoryService.softDeleteCategory(req.params.id);
    res.status(200).json({ success: true, message: 'Category soft deleted', data: result });
  } catch (error) {
    handleError(res, error);
  }
}

// Permanently Delete Category
async function deleteCategoryPermanently(req, res) {
  try {
    const result = await CategoryService.deleteCategoryPermanently(req.params.id);
    res.status(200).json({ success: true, message: 'Category permanently deleted', data: result });
  } catch (error) {
    handleError(res, error);
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  softDeleteCategory,
  deleteCategoryPermanently,
};
