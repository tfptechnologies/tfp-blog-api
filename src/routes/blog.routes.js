const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.Controller');
const { validateCreateBlog, validateUpdateBlog } = require('../validators/blog.validator');


router.get('/', blogController.listBlogs);
router.get('/:id', blogController.getBlogById);

router.post('/', validateCreateBlog,blogController.createBlog);
router.put('/:id',validateUpdateBlog, blogController.updateBlog);

router.patch('/:id', validateUpdateBlog,blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
