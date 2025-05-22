const prisma = require("../prisma/client");

module.exports = {
  // Create Category
  async createCategory(data) {
    return await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        isActive: data.isActive ?? true,
      },
    });
  },

  // Get All Categories (with optional filters)
  async getAllCategories({ isActive = true } = {}) {
    return await prisma.category.findMany({
      where: {
        isActive,
      },
      orderBy: {
        name: "asc",
      },
    });
  },

  // Get Category by ID
  async getCategoryById(id) {
    return await prisma.category.findUnique({
      where: { id },
    });
  },

  // Get Category by Slug
  async getCategoryBySlug(slug) {
    return await prisma.category.findUnique({
      where: { slug },
    });
  },

  // Update Category
  async updateCategory(id, updateData) {
    return await prisma.category.update({
      where: { id },
      data: {
        name: updateData.name,
        slug: updateData.slug,
        isActive: updateData.isActive,
      },
    });
  },

  // Soft Delete Category (set isActive to false)
  async softDeleteCategory(id) {
    return await prisma.category.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  },

  // Hard Delete Category
  async deleteCategoryPermanently(id) {
    return await prisma.category.delete({
      where: { id },
    });
  },
};
