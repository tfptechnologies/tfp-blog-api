// src/services/tag.service.js

const TagModel = require("../models/tag.model");

module.exports = {
  // Create a new tag with validation
  async createTag(data) {
    const existing = await TagModel.tagExists({
      name: data.name,
      slug: data.slug,
    });
    if (existing) {
      throw { message: "Tag Already Exist", code: "TAG_ALREADY_EXIST" };
    }

    try {
      return await TagModel.createTag(data);
    } catch (err) {
      throw {
        message: "Failed to create tag",
        code: "TAG_CREATION_FAILED",
        error: err,
      };
    }
  },

  // Get all active tags
  async getAllTags() {
    try {
      return await TagModel.getAllTags();
    } catch (err) {
      throw {
        message: "Failed to fetch tags",
        code: "TAG_FETCH_FAILED",
        error: err,
      };
    }
  },

  // Get all tags regardless of status
  async getAllTagsWithStatus() {
    try {
      return await TagModel.getAllTagsWithStatus();
    } catch (err) {
      throw {
        message: "Failed to fetch all tags",
        code: "TAG_FETCH_ALL_FAILED",
        error: err,
      };
    }
  },

  // Get tag by ID
  async getTagById(id) {
    const tag = await TagModel.getTagById(id);
    if (!tag) {
      throw { message: "Tag not found", code: "TAG_NOT_FOUND" };
    }

    return tag;
  },

  // Update tag by ID
  async updateTag(id, data) {
    const existing = await TagModel.getTagById(id);
    if (!existing) {
      throw { message: "Tag not found", code: "TAG_NOT_FOUND" };
    }

    if (data.name || data.slug) {
      const conflict = await TagModel.tagExists({
        name: data.name,
        slug: data.slug,
      });
      if (conflict && conflict.id !== id) {
        throw {
          message: "Tag name or slug already exists",
          code: "TAG_CONFLICT",
        };
      }
    }

    try {
      return await TagModel.updateTag(id, data);
    } catch (err) {
      throw {
        message: "Failed to update tag",
        code: "TAG_UPDATE_FAILED",
        error: err,
      };
    }
  },

  // Deactivate tag (soft delete)
  async deactivateTag(id) {
    const tag = await TagModel.getTagById(id);
    if (!tag) {
      throw { message: "Tag not found", code: "TAG_NOT_FOUND" };
    }
    if (!tag.isActive) {
      throw {
        message: "Tag is already inactive",
        code: "TAG_ALREADY_INACTIVE",
      };
    }

    try {
      return await TagModel.deactivateTag(id);
    } catch (err) {
      throw {
        message: "Failed to deactivate tag",
        code: "TAG_DEACTIVATE_FAILED",
        error: err,
      };
    }
  },

  // Reactivate tag
  async activateTag(id) {
    const tag = await TagModel.getTagById(id);
    if (!tag) {
      throw { message: "Tag not found", code: "TAG_NOT_FOUND" };
    }
    if (tag.isActive) {
      throw { message: "Tag is already active", code: "TAG_ALREADY_ACTIVE" };
    }

    try {
      return await TagModel.activateTag(id);
    } catch (err) {
      throw {
        message: "Failed to activate tag",
        code: "TAG_ACTIVATE_FAILED",
        error: err,
      };
    }
  },

  // Permanently delete a tag
  async deleteTagPermanently(id) {
    const tag = await TagModel.getTagById(id);
    if (!tag) {
      throw { message: "Tag not found", code: "TAG_NOT_FOUND" };
    }

    try {
      return await TagModel.deleteTagPermanently(id);
    } catch (err) {
      throw {
        message: "Failed to delete tag",
        code: "TAG_DELETE_FAILED",
        error: err,
      };
    }
  },

  // Get blogs by tag ID
  async getBlogsByTagId(tagId) {
    const tag = await TagModel.getTagById(tagId);
    if (!tag) {
      throw { message: "Tag not found", code: "TAG_NOT_FOUND" };
    }

    try {
      return await TagModel.getBlogsByTagId(tagId);
    } catch (err) {
      throw {
        message: "Failed to fetch blogs for tag",
        code: "TAG_BLOG_FETCH_FAILED",
        error: err,
      };
    }
  },
};
