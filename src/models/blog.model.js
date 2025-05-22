// models/blog.model.js
const prisma = require('../prisma/client'); // your prisma client

async function createBlog(data) {
  return await prisma.blog.create({ data });
}

async function getBlogById(id) {
  // Fetch blog only if not soft deleted
  return await prisma.blog.findFirst({
    where: { id, isDeleted: false },
  });
}

async function updateBlog(id, data) {
  // Only update if not soft deleted
  return await prisma.blog.updateMany({
    where: { id, isDeleted: false },
    data,
  }).then(result => {
    if (result.count === 0) return null;
    return getBlogById(id);
  });
}

async function deleteBlog(id) {
  // Soft delete: set isDeleted=true, deletedAt=now()
  return await prisma.blog.updateMany({
    where: { id, isDeleted: false },
    data: { isDeleted: true, deletedAt: new Date() },
  }).then(result => {
    if (result.count === 0) return null;
    return { id, softDeleted: true };
  });
}

async function listBlogs({ skip = 0, take = 10, where = {} }) {
  // Add isDeleted: false to filter
  const filter = { ...where, isDeleted: false };
  return await prisma.blog.findMany({
    where: filter,
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  });
}

module.exports = {
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  listBlogs,
};
