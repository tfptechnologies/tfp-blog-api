const blogModel = require('../models/blog.model');
const { blog } = require('../prisma/client');

async function createBlog(data) {
  if (!data.title || !data.content || !data.authorId) {
    // 400 Bad Request
    const err = new Error('400: Missing required fields: title, content, and authorId are required');
    err.statusCode = 400;
    throw err;
  }

  try {
    const createdBlog = await blogModel.createBlog(data);
    return createdBlog;
  } catch (error) {
    const err = new Error('Failed to create blog: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
}

async function getBlogById(id) {
  if (!id) {
    // 400 Bad Request
    const err = new Error('400: Blog ID is required');
    err.statusCode = 400;
    throw err;
  }

  try {
    const foundBlog = await blogModel.getBlogById(id);
    if (!foundBlog) {
      const err = new Error('404: Blog not found or has been deleted');
      err.statusCode = 404;
      throw err;
    }
    return foundBlog;
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error('Failed to get blog: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
}

async function updateBlog(id, data) {
  if (!id) {
    // 400 Bad Request
    const err = new Error('400: Blog ID is required');
    err.statusCode = 400;
    throw err;
  }

  try {
    const existingBlog = await blogModel.getBlogById(id);
    if (!existingBlog) {
      const err = new Error('404: Blog not found or has been deleted');
      err.statusCode = 404;
      throw err;
    }

    const updatedBlog = await blogModel.updateBlog(id, data);
    return updatedBlog;
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error('Failed to update blog: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
}

async function deleteBlog(id) {
  if (!id) {
    // 400 Bad Request
    const err = new Error('400: Blog ID is required');
    err.statusCode = 400;
    throw err;
  }

  try {
    const existingBlog = await blogModel.getBlogById(id);
    if (!existingBlog) {
      const err = new Error('404: Blog not found or already deleted');
      err.statusCode = 404;
      throw err;
    }

    const deletedBlog = await blogModel.deleteBlog(id);
    if (!deletedBlog) {
      const err = new Error('Failed to delete blog');
      err.statusCode = 500;
      throw err;
    }
    return deletedBlog;
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error('Failed to delete blog: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
}

async function listBlogs(params) {
  try {
    const blogs = await blogModel.listBlogs(params);
    if (!blogs || blogs.length === 0) {
      // 404 Not Found
      const err = new Error('404: No blogs found');
      err.statusCode = 404;
      throw err;
    }
    return blogs;
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error('Failed to list blogs: ' + error.message);
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  listBlogs,
};
