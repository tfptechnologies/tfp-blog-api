// models/image.model.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uplodeImage = async (data) => {
  return await prisma.image.create({
    data,
  });
};

const getAllImages = async () => {
  return await prisma.image.findMany({
    where: {
      deletedAt: null, // Exclude soft-deleted images
    },
  });
};

const getImageById = async (id) => {
  return await prisma.image.findFirst({
    where: {
      id,
      deletedAt: null, // Only active images
    },
  });
};


const updateImage = async (id, data) => {
  return await prisma.image.update({
    where: { id },
    data,
  });
};

const deleteImage = async (id) => {
  return await prisma.image.update({
    where: { id },
    data: {
      deletedAt: new Date(), // Soft delete
    },
  });
};

module.exports = {
  uplodeImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
};




// const getImageByUrl = async (url) => {
//   return await prisma.image.findFirst({
//     where: {
//       url,
//       deletedAt: null,
//     },
//   });
// };