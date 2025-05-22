const express = require('express');
const CommentController = require('../controllers/comment.Controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Create a new comment
router.post('/',  CommentController.create);

// Create a reply to a comment
router.post('/reply',  CommentController.createReply);

// Get all comments for a blog
router.get('/blog/:blogId', CommentController.getByBlog);

// Get a single comment by ID
router.get('/:id', CommentController.getById);


// Soft delete a comment
router.patch('/:id/soft-delete',  CommentController.softDelete);


// Approve or reject a comment
router.patch('/:id/approve', CommentController.approve);

// Get replies for a comment
router.get('/:replyId/replies', CommentController.getReplies);

module.exports = router;





// Update a comment
// router.put('/:id',  CommentController.update);
// Hard delete a comment
// router.delete('/:id',  CommentController.delete);
