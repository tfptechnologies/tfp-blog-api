// controllers/image.controller.js
const imageService = require("../services/image.service");

const uplodeImage = async (req, res) => {
  try {
    const filePath = req.file?.path;
    const fileName = req.file?.filename;
    const input = req.body;

    if (!filePath || !fileName) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded.",
      });
    }

    // multer -> middleware -> req.files[0].path // .fileName
    //  Date.now() 13342563 - user.id

    const image = await imageService.uplodeImage(input, {
      path: filePath,
      name: fileName,
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      data: image,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to upload image.",
    });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to fetch images.",
    });
  }
};

const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageService.getImageById(id);
    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to fetch image by ID.",
    });
  }
};

const getImageByUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const image = await imageService.getImageByUrl(url);
    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to fetch image by URL.",
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = req.file?.path;
    const fileName = req.file?.fileName;
    const input = req.body;

    const updated = await imageService.updateImage(
      id,
      input,
      filePath ? { path: filePath, name: fileName } : null
    );

    res.status(200).json({
      success: true,
      message: "Image updated successfully.",
      data: updated,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to update image.",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await imageService.deleteImage(id);
    res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to delete image.",
    });
  }
};

module.exports = {
  uplodeImage,
  getAllImages,
  getImageById,
  getImageByUrl,
  updateImage,
  deleteImage,
};
