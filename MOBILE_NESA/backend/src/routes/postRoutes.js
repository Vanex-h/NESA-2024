const express = require("express");
const Post = require("../models/post");
const Comment = require("../models/comment");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user.userId,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { UserId: req.user.userId } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id, UserId: req.user.userId },
      include: Comment,
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await Post.destroy({
      where: { id: req.params.id, UserId: req.user.userId },
    });
    if (result) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
