// src/controllers/tag.controller.js

const TagService = require("../services/tag.service");

module.exports = {
  // Create a new tag
  async createTag(req, res) {
    try {
      const tag = await TagService.createTag(req.body);
      res.status(201).json({
        message: "Tag created successfully",
        code: "TAG_CREATED",
        data: tag,
      });
    } catch (err) {
      res.status(err.code === "TAG_ALREADY_EXIST" ? 409 : 500).json({
        message: err.message || "Failed to create tag",
        code: err.code || "TAG_CREATE_ERROR",
      });
    }
  },

  // Get all active tags
  async getAllTags(req, res) {
    try {
      const tags = await TagService.getAllTags();
      res.status(200).json({
        message: "Tags fetched successfully",
        code: "TAGS_FETCHED",
        data: tags,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Failed to fetch tags",
        code: err.code || "TAGS_FETCH_ERROR",
      });
    }
  },

  // Get all tags including inactive
  async getAllTagsWithStatus(req, res) {
    try {
      const tags = await TagService.getAllTagsWithStatus();
      res.status(200).json({
        message: "All tags fetched successfully",
        code: "ALL_TAGS_FETCHED",
        data: tags,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Failed to fetch all tags",
        code: err.code || "ALL_TAGS_FETCH_ERROR",
      });
    }
  },

  // Get tag by ID
  async getTagById(req, res) {
    try {
      const tag = await TagService.getTagById(req.params.id);
      res.status(200).json({
        message: "Tag fetched successfully",
        code: "TAG_FETCHED",
        data: tag,
      });
    } catch (err) {
      res.status(err.code === "TAG_NOT_FOUND" ? 404 : 500).json({
        message: err.message || "Failed to fetch tag",
        code: err.code || "TAG_FETCH_ERROR",
      });
    }
  },

  // Update tag by ID
  async updateTag(req, res) {
    try {
      const tag = await TagService.updateTag(req.params.id, req.body);
      res.status(200).json({
        message: "Tag updated successfully",
        code: "TAG_UPDATED",
        data: tag,
      });
    } catch (err) {
      const status =
        err.code === "TAG_NOT_FOUND"
          ? 404
          : err.code === "TAG_CONFLICT"
          ? 409
          : 500;
      res.status(status).json({
        message: err.message || "Failed to update tag",
        code: err.code || "TAG_UPDATE_ERROR",
      });
    }
  },

  // Deactivate tag
  async deactivateTag(req, res) {
    try {
      const tag = await TagService.deactivateTag(req.params.id);
      res.status(200).json({
        message: "Tag deactivated successfully",
        code: "TAG_DEACTIVATED",
        data: tag,
      });
    } catch (err) {
      const status =
        err.code === "TAG_NOT_FOUND"
          ? 404
          : err.code === "TAG_ALREADY_INACTIVE"
          ? 400
          : 500;
      res.status(status).json({
        message: err.message || "Failed to deactivate tag",
        code: err.code || "TAG_DEACTIVATE_ERROR",
      });
    }
  },

  // Activate tag
  async activateTag(req, res) {
    try {
      const tag = await TagService.activateTag(req.params.id);
      res.status(200).json({
        message: "Tag activated successfully",
        code: "TAG_ACTIVATED",
        data: tag,
      });
    } catch (err) {
      const status =
        err.code === "TAG_NOT_FOUND"
          ? 404
          : err.code === "TAG_ALREADY_ACTIVE"
          ? 400
          : 500;
      res.status(status).json({
        message: err.message || "Failed to activate tag",
        code: err.code || "TAG_ACTIVATE_ERROR",
      });
    }
  },

  // Permanently delete tag
  async deleteTagPermanently(req, res) {
    try {
      const tag = await TagService.deleteTagPermanently(req.params.id);
      res.status(200).json({
        message: "Tag deleted permanently",
        code: "TAG_DELETED",
        data: tag,
      });
    } catch (err) {
      res.status(err.code === "TAG_NOT_FOUND" ? 404 : 500).json({
        message: err.message || "Failed to delete tag",
        code: err.code || "TAG_DELETE_ERROR",
      });
    }
  },

  // Get blogs associated with tag
  async getBlogsByTagId(req, res) {
    try {
      const tagWithBlogs = await TagService.getBlogsByTagId(req.params.id);
      res.status(200).json({
        message: "Blogs by tag fetched successfully",
        code: "TAG_BLOGS_FETCHED",
        data: tagWithBlogs,
      });
    } catch (err) {
      res.status(err.code === "TAG_NOT_FOUND" ? 404 : 500).json({
        message: err.message || "Failed to fetch blogs by tag",
        code: err.code || "TAG_BLOGS_FETCH_ERROR",
      });
    }
  },
};
