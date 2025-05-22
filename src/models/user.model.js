// models/user.model.js
const prisma = require('../prisma/client');

const UserModel = {
  // Create a new user
  async createUser(data) {
    return await prisma.user.create({
      data,
    });
  },

  // Get user by ID
  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        userImage: true,
        posts: true,
        comments: true,
        userLikedBlogs: true,
        userDisLikedBlogs: true,
      },
    });
  },

  // Get user by email
  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  // Get all users
  async getAllUsers() {
    return await prisma.user.findMany({
      where: { isDeleted: null },
      include: {
        userImage: true,
        posts: true,
      },
    });
  },

  // Update user by ID
  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  // Soft delete user
  async softDeleteUser(id) {
    return await prisma.user.update({
      where: { id },
      data: {
        isDeleted: new Date(),
        isActive: false,
      },
    });
  },

  // Hard delete user
  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};

module.exports = UserModel;
