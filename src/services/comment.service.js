const CommentModel = require('../models/comment.model');

const CommentService = {
  // Create comment or reply
  async createComment(data) {
    const { content, userId, blogId, isReply, replyId } = data;

    if (!content || !userId || !blogId) {
      throw { code: 400, message: 'Missing required fields: content, userId, blogId' };
    }

    if (isReply && !replyId) {
      throw { code: 400, message: 'Missing replyId for comment reply' };
    }

    try {
      const comment = await CommentModel.create({
        content,
        userId,
        blogId,
        isReply: !!isReply,
        replyId: replyId || null,
      });
      return comment;
    } catch (err) {
      console.error(err);
      throw { code: 500, message: 'Failed to create comment' };
    }
  },

  // Create reply to a comment
  async createReply({ content, userId, blogId, replyId }) {
    if (!content || !userId || !blogId || !replyId) {
      throw { code: 400, message: 'Missing required fields: content, userId, blogId, replyId' };
    }

    try {
      return await CommentModel.createReply({
        content,
        userId,
        blogId,
        replyId,
      });
    } catch (err) {
      console.error(err);
      throw { code: 500, message: 'Failed to create reply' };
    }
  },

  // Get all comments for a blog
  async getCommentsByBlog(blogId) {
    if (!blogId) throw { code: 400, message: 'Blog ID is required' };

    try {
      return await CommentModel.findByBlogId(blogId);
    } catch (err) {
      console.error(err);
      throw { code: 500, message: 'Failed to fetch comments' };
    }
  },

  // Get single comment by ID
  async getCommentById(id) {
    if (!id) throw { code: 400, message: 'Comment ID is required' };

    const comment = await CommentModel.findById(id);
    if (!comment) throw { code: 404, message: 'Comment not found' };

    return comment;
  },

  
  // Soft delete
  async softDeleteComment(id) {
    if (!id) throw { code: 400, message: 'Comment ID is required' };

    try {
      return await CommentModel.softDelete(id);
    } catch (err) {
      console.error(err);
      throw { code: 500, message: 'Failed to soft delete comment' };
    }
  },
  
  
  // Approve or reject
  async setCommentApproval(id, isApproved) {
    if (!id) throw { code: 400, message: 'Comment ID is required' };
    
    try {
      return await CommentModel.setApproval(id, isApproved);
    } catch (err) {
      console.error(err);
      throw { code: 500, message: 'Failed to update approval status' };
    }
  },
  
  // Get replies for a comment
  async getRepliesByCommentId(replyId) {
    if (!replyId) throw { code: 400, message: 'Reply ID is required' };
    
    try {
      return await CommentModel.getReplies(replyId);
    } catch (err) {
      console.error(err);
      throw { code: 500, message: 'Failed to fetch replies' };
    }
  }
};

module.exports = CommentService;








// Update comment
// async updateComment(id, updates) {
  //   if (!id) throw { code: 400, message: 'Comment ID is required' };
  
  //   try {
    //     const comment = await CommentModel.update(id, updates);
    //     return comment;
    //   } catch (err) {
      //     console.error(err);
      //     throw { code: 500, message: 'Failed to update comment' };
      //   }
      // },
      // Hard delete
      // async deleteComment(id) {
      //   if (!id) throw { code: 400, message: 'Comment ID is required' };
        
      //   try {
      //     return await CommentModel.delete(id);
      //   } catch (err) {
      //     console.error(err);
      //     throw { code: 500, message: 'Failed to permanently delete comment' };
      //   }
      // },