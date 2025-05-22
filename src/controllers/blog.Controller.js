// controllers/blog.controller.js
const blogService = require('../services/blog.service');

async function createBlog(req, res) {
  try {
    const data = req.body;

    if (!data.title || !data.content) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title and content are required',
      });
    }

    const blog = await blogService.createBlog(data);
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating blog',
      error: error.message,
    });
  }
}

async function getBlogById(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching blog',
      error: error.message,
    });
  }
}

async function updateBlog(req, res) {
  try {
    const id = req.params.id;
    const authorId = req.user?.id; // Assuming user info is in req.user
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (blog.authorId !== authorId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this blog',
      });
    }

    const updatedBlog = await blogService.updateBlog(id, data);
    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error updating blog',
      error: error.message,
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const id = req.params.id;
    const authorId = req.user?.id; // Assuming user info is in req.user

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Blog ID is required',
      });
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    if (blog.authorId !== authorId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this blog',
      });
    }

    await blogService.deleteBlog(id);
    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error deleting blog',
      error: error.message,
    });
  }
}

async function listBlogs(req, res) {
  try {
    const { skip, take, ...filters } = req.query;

    const params = {
      skip: skip ? parseInt(skip, 10) : 0,
      take: take ? parseInt(take, 10) : 10,
      where: filters || {},
    };

    const blogs = await blogService.listBlogs(params);
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching blogs',
      error: error.message,
    });
  }
}

module.exports = {
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  listBlogs,
};
