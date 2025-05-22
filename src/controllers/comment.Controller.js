const CommentService = require('../services/comment.service');

const CommentController = {
  // Create comment or reply
  async create(req, res) {
    try {
      const { content, blogId } = req.body;
      const userId = req.user?.id;

      // Validate inputs
      if (!content || !blogId || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Content, blogId, and userId are required.',
        });
      }

      const comment = await CommentService.createComment({ ...req.body, userId });
      return res.status(201).json({ success: true, message: 'Comment created successfully', data: comment });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  },

  // ✅ Create a reply to a comment
  async createReply(req, res) {
    try {
      const { content, blogId, replyId } = req.body;
      const userId = req.user?.id;

      if (!content || !blogId || !replyId || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Content, blogId, replyId, and userId are required.',
        });
      }

      const reply = await CommentService.createReply({ content, blogId, replyId, userId });
      return res.status(201).json({ success: true, message: 'Reply created successfully', data: reply });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  },

  // Get all comments for a specific blog
  async getByBlog(req, res) {
    try {
      const { blogId } = req.params;
      const comments = await CommentService.getCommentsByBlog(blogId);
      return res.status(200).json({ success: true, data: comments });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  },

  // Get a single comment by ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const comment = await CommentService.getCommentById(id);
      return res.status(200).json({ success: true, data: comment });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  },

  
  // Soft delete a comment
  async softDelete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await CommentService.softDeleteComment(id);
      return res.status(200).json({ success: true, message: 'Comment soft deleted', data: deleted });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  },
  
  // Approve or reject a comment
  async approve(req, res) {
    try {
      const { id } = req.params;
      const { isApproved } = req.body;
      
      if (typeof isApproved !== 'boolean') {
        return res.status(400).json({ success: false, message: 'isApproved must be a boolean' });
      }
      
      const result = await CommentService.setCommentApproval(id, isApproved);
      return res.status(200).json({ success: true, message: 'Comment approval status updated', data: result });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  },
  
  // Get all replies of a comment
  async getReplies(req, res) {
    try {
      const { replyId } = req.params;
      const replies = await CommentService.getRepliesByCommentId(replyId);
      return res.status(200).json({ success: true, data: replies });
    } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
    }
  }
};

module.exports = CommentController;








// Update a comment
// async update(req, res) {
  //   try {
    //     const { id } = req.params;
    //     const updated = await CommentService.updateComment(id, req.body);
    //     return res.status(200).json({ success: true, data: updated });
    //   } catch (err) {
      //     return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
      //   }
      // },
      
      // Permanently delete a comment
      // async delete(req, res) {
      //   try {
      //     const { id } = req.params;
      //     const deleted = await CommentService.deleteComment(id);
      //     return res.status(200).json({ success: true, message: 'Comment permanently deleted', data: deleted });
      //   } catch (err) {
      //     return res.status(err.code || 500).json({ success: false, message: err.message || 'Server Error' });
      //   }
      // },