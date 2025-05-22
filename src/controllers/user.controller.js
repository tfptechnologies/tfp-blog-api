const UserService = require("../services/user.service");

// Create a new user
async function createUser(req, res) {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    if (error.message.includes('in use')) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
        error: error.message
      });
    }
    return res.status(error.code || 500).json({
      success: false,
      message: 'Failed to create user',
      error: error.message || 'Internal server error'
    });
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    if (error.message.includes('required')) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
        error: error.message
      });
    }
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching user',
      error: error.message
    });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    if (error.message.includes('No users')) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
        error: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching users',
      error: error.message
    });
  }
};

// Update user
async function updateUser(req, res) {
 try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: updatedUser
    });
  } catch (error) {

    if (error.message.includes('required')) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
        error: error.message
      });
    }

    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: error.message
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Failed to update user profile',
      error: error.message
    });
  }
};


// Soft delete user
async function softDeleteUser(req, res) {
  try {
    await UserService.softDeleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "User soft deleted successfully"
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: "Failed to soft delete user",
      error: error.message || "Internal server error"
    });
  }
}

// Hard delete user
async function deleteUser(req, res) {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "User permanently deleted successfully"
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: "Failed to permanently delete user",
      error: error.message || "Internal server error"
    });
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  softDeleteUser,
  deleteUser,
};
