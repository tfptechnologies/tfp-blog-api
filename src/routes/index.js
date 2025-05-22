const express = require("express");
const authRoutes = require("./auth.routes");
const categoryRoutes = require("./category.routes");
const tagRoutes = require("./tag.routes");
const userRoutes = require("./user.routes");
const blogRoutes = require("./blog.routes");
const commentRoutes = require("./comment.routes");
const imageRoutes = require("./image.routes");



const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);
router.use("/image", imageRoutes);
router.use("/category", categoryRoutes);
router.use("/tag", tagRoutes);

module.exports = router;
