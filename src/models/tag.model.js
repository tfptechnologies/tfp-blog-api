const prisma = require("../prisma/client");

module.exports = {
  // Create a new Tag
  async createTag(data) {
    return await prisma.tag.create({
      data,
    });
  },

  // Get all active Tags
  async getAllTags() {
    return await prisma.tag.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  },

  // Get all Tags (including inactive)
  async getAllTagsWithStatus() {
    return await prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  // Get Tag by ID
  async getTagById(id) {
    return await prisma.tag.findUnique({
      where: { id },
    });
  },

  // Get Tag by Slug
  async getTagBySlug(slug) {
    return await prisma.tag.findUnique({
      where: { slug },
    });
  },

  // Update Tag by ID
  async updateTag(id, data) {
    return await prisma.tag.update({
      where: { id },
      data,
    });
  },

  // Soft Delete (deactivate) Tag
  async deactivateTag(id) {
    return await prisma.tag.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  },

  // Reactivate Tag
  async activateTag(id) {
    return await prisma.tag.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  },

  // Permanently delete a Tag (only if no Blog is associated)
  async deleteTagPermanently(id) {
    return await prisma.tag.delete({
      where: { id },
    });
  },

  // Check if Tag exists by name or slug (useful before creating/updating)
  async tagExists({ name, slug }) {
    return await prisma.tag.findFirst({
      where: {
        OR: [{ name }, { slug }],
      },
    });
  },

  // Get Blogs by Tag ID (with limited fields)
  async getBlogsByTagId(tagId) {
    return await prisma.tag.findUnique({
      where: { id: tagId },
      include: {
        tagOnBlogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                isPublished: true,
                postedAt: true,
              },
            },
          },
        },
      },
    });
  },
};
