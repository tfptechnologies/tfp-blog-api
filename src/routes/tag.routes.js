
const router = require("express").Router();

const TagController = require('../controllers/tag.controller');
const {
  validateCreateTag,
  validateUpdateTag,l
} = require('../validators/tag.validator');


// Create a new tag
router.post('/', validateCreateTag, TagController.createTag);

// Get all active tags
router.get('/', TagController.getAllTags);

// Get all tags (active + inactive)
router.get('/all', TagController.getAllTagsWithStatus);

// Get a tag by ID
router.get('/:id', TagController.getTagById);

// Update a tag
router.put('/:id', validateUpdateTag, TagController.updateTag);

// Deactivate a tag (soft delete)
router.patch('/:id/deactivate', TagController.deactivateTag);

// Reactivate a deactivated tag
router.patch('/:id/activate', TagController.activateTag);

// Permanently delete a tag
router.delete('/:id', TagController.deleteTagPermanently);

// Get blogs associated with a tag
router.get('/:id/blogs', TagController.getBlogsByTagId);

module.exports = router;
