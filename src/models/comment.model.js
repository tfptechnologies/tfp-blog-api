// models/comment.model.js

const prisma = require('../prisma/client');


const CommentModel = {
  // Create a new comment or reply
  create: async (data) => {
    return await prisma.comment.create({ data });
  },


    createReply: async ({ content, blogId, userId, replyId }) => {
    return await prisma.comment.create({
      data: {
        content,
        blogId,
        userId,
        replyId,
        isReply: true,
      },
    });
  },

  // Get all comments for a specific blog (excluding deleted)
  findByBlogId: async (blogId) => {
    return await prisma.comment.findMany({
      where: {
        blogId,
        isDeleted: false,
        isReply: false,
      },
      include: {
        replies: {
          where: { isDeleted: false },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },




  // Get a single comment by ID
  findById: async (id) => {
    return await prisma.comment.findUnique({
      where: { id },
      include: {
        replies: true,
        user: true,
        blog: true,
      },
    });
  },

  
  // Soft delete a comment
  softDelete: async (id) => {
    return await prisma.comment.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  },
  
  // Approve or reject comment
  setApproval: async (id, isApproved) => {
    return await prisma.comment.update({
      where: { id },
      data: { isApproved },
    });
  },
  
  // Get all replies to a comment
  getReplies: async (replyId) => {
    return await prisma.comment.findMany({
      where: {
        replyId,
        isDeleted: false,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  },
};

module.exports = CommentModel;








// Update comment content or approval
// update: async (id, data) => {
  //   return await prisma.comment.update({
    //     where: { id },
    //     data,
    //   });
    // },
    
    // Hard delete a comment (permanent)
    // delete: async (id) => {
      //   return await prisma.comment.delete({
        //     where: { id },
        //   });
        // },