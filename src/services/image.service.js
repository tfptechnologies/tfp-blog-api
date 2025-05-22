const { v4: uuidv4 } = require('uuid');
const imageModel = require('../models/image.model');

const uplodeImage = async (input, fileInfo) => {
  if (!input || typeof input !== 'object') {
    const error = new Error("Input data is required and must be an object.");
    error.statusCode = 400;
    throw error;
  }

  if (!fileInfo?.path || !fileInfo?.name) {
    const error = new Error("File information is missing.");
    error.statusCode = 400;
    throw error;
  }

  
  const uniqueUrl = `/images/${uuidv4()}`;

  const data = {
    ...input,
    url: uniqueUrl,
    filePath: fileInfo.path,
    filename: fileInfo.name,
  };

  try {
    return await imageModel.uplodeImage(data);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Failed to create image.";
    throw err;
  }
};

const getAllImages = async () => {
  try {
    return await imageModel.getAllImages();
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Failed to fetch images.";
    throw err;
  }
};

const getImageById = async (id) => {
  if (!id) {
    const error = new Error("Image ID is required.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const image = await imageModel.getImageById(id);
    if (!image) {
      const error = new Error("Image not found.");
      error.statusCode = 404;
      throw error;
    }
    return image;
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Failed to fetch image by ID.";
    throw err;
  }
};

const updateImage = async (id, input, fileInfo) => {
  if (!id) {
    const error = new Error("Image ID is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!input || typeof input !== 'object') {
    const error = new Error("Input data must be provided for update.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const existingImage = await imageModel.getImageById(id);
    if (!existingImage) {
      const error = new Error("Image not found.");
      error.statusCode = 404;
      throw error;
    }

    const data = { ...input };
    if (fileInfo) {
      data.filePath = fileInfo.path;
      data.fileName = fileInfo.name;
    }

    return await imageModel.updateImage(id, data);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Failed to update image.";
    throw err;
  }
};

const deleteImage = async (id) => {
  if (!id) {
    const error = new Error("Image ID is required.");
    error.statusCode = 400;
    throw error;
  }
  
  try {
    const existingImage = await imageModel.getImageById(id);
    if (!existingImage) {
      const error = new Error("Image not found.");
      error.statusCode = 404;
      throw error;
    }
    
    return await imageModel.deleteImage(id);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Failed to delete image.";
    throw err;
  }
};

module.exports = {
  uplodeImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
};







// const getImageByUrl = async (url) => {
//   if (!url) {
//     const error = new Error("Image URL is required.");
//     error.statusCode = 400;
//     throw error;
//   }

//   try {
//     const image = await imageModel.getImageByUrl(url);
//     if (!image) {
//       const error = new Error("Image not found for this URL.");
//       error.statusCode = 404;
//       throw error;
//     }
//     return image;
//   } catch (err) {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Failed to fetch image by URL.";
//     throw err;
//   }
// };