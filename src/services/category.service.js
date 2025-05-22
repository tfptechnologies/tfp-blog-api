const CategoryModel = require("../models/category.model");

// Create Category
async function createCategory(data) {
  try {
    const existing = await CategoryModel.getCategoryBySlug(data.slug);
    if (existing) {
      throw {
        code: "CATEGORY_ALREADY_EXISTS",
        message: "Category with this slug already exists.",
      };
    }
    return await CategoryModel.createCategory(data);
  } catch (error) {
    throw {
      code: error.code || "CREATE_CATEGORY_FAILED",
      message: error.message || "Failed to create category.",
    };
  }
}

// Get All Categories
async function getAllCategories(filter = {}) {
  try {
    return await CategoryModel.getAllCategories(filter);
  } catch (error) {
    throw {
      code: error.code || "FETCH_CATEGORIES_FAILED",
      message: error.message || "Failed to fetch categories.",
    };
  }
}

// Get Category by ID
async function getCategoryById(id) {
  try {
    const category = await CategoryModel.getCategoryById(id);
    if (!category) {
      throw { code: "CATEGORY_NOT_FOUND", message: "Category not found." };
    }
    return category;
  } catch (error) {
    throw {
      code: error.code || "FETCH_CATEGORY_BY_ID_FAILED",
      message: error.message || "Failed to fetch category by ID.",
    };
  }
}

// Get Category by Slug
async function getCategoryBySlug(slug) {
  try {
    const category = await CategoryModel.getCategoryBySlug(slug);
    if (!category) {
      throw { code: "CATEGORY_NOT_FOUND", message: "Category not found." };
    }
    return category;
  } catch (error) {
    throw {
      code: error.code || "FETCH_CATEGORY_BY_SLUG_FAILED",
      message: error.message || "Failed to fetch category by slug.",
    };
  }
}

// Update Category
async function updateCategory(id, data) {
  try {
    const category = await CategoryModel.getCategoryById(id);
    if (!category) {
      throw { code: "CATEGORY_NOT_FOUND", message: "Category not found." };
    }
    return await CategoryModel.updateCategory(id, data);
  } catch (error) {
    throw {
      code: error.code || "UPDATE_CATEGORY_FAILED",
      message: error.message || "Failed to update category.",
    };
  }
}

// Soft Delete Category
async function softDeleteCategory(id) {
  try {
    const category = await CategoryModel.getCategoryById(id);
    if (!category) {
      throw { code: "CATEGORY_NOT_FOUND", message: "Category not found." };
    }
    return await CategoryModel.softDeleteCategory(id);
  } catch (error) {
    throw {
      code: error.code || "SOFT_DELETE_CATEGORY_FAILED",
      message: error.message || "Failed to soft delete category.",
    };
  }
}

// Permanently Delete Category
async function deleteCategoryPermanently(id) {
  try {
    const category = await CategoryModel.getCategoryById(id);
    if (!category) {
      throw { code: "CATEGORY_NOT_FOUND", message: "Category not found." };
    }
    return await CategoryModel.deleteCategoryPermanently(id);
  } catch (error) {
    throw {
      code: error.code || "DELETE_CATEGORY_FAILED",
      message: error.message || "Failed to delete category.",
    };
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
