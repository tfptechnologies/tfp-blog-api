// services/user.service.js
const UserModel = require('../models/user.model');

async function createUser(data) {
  try {
    const existingUser = await UserModel.getUserByEmail(data.email);
    if (existingUser) {
      const error = new Error({
        message: "Email already in use",
        code:"EMAIL_ALREADY_REGISTERED"
      });
      error.code = 409;
      throw error;
    }
    const user = await UserModel.createUser(data);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    if (!id) {
      const error = new Error('User ID is required');
      error.code = 400;
      throw error;
    }
    const user = await UserModel.getUserById(id);
    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const users = await UserModel.getAllUsers();
    if (!users || users.length === 0) {
      const error = new Error('No users found');
      error.code = 404;
      throw error;
    }
    return users;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, data) {
  try {
    if (!id) {
      const error = new Error('User ID is required');
      error.code = 400;
      throw error;
    }
    const user = await UserModel.getUserById(id);
    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }
    const updatedUser = await UserModel.updateUser(id, data);
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function softDeleteUser(id) {
  try {
    if (!id) {
      const error = new Error('User ID is required');
      error.code = 400;
      throw error;
    }
    const user = await UserModel.getUserById(id);
    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }
    const softDeletedUser = await UserModel.softDeleteUser(id);
    return softDeletedUser;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    if (!id) {
      const error = new Error('User ID is required');
      error.code = 400;
      throw error;
    }
    const user = await UserModel.getUserById(id);
    if (!user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }
    const deletedUser = await UserModel.deleteUser(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  softDeleteUser,
  deleteUser
};
