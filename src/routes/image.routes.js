const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller'); //  lowercase "controller"
const upload = require('../middlewares/multer.middleware'); //  consistent file name

// Upload a new image
router.post('/', upload.single('image'), imageController.uplodeImage);

// Get all images
router.get('/', imageController.getAllImages);

// Get image by ID
router.get('/:id', imageController.getImageById);

// Update image by ID
router.put('/:id', upload.single('image'), imageController.updateImage);

// Delete image by ID
router.delete('/:id', imageController.deleteImage);

module.exports = router;
