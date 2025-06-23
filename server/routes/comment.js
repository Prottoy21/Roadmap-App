const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const RoadmapItem = require("../models/RoadmapItem");
const auth = require("../middleware/authMiddleware");
const { ObjectId } = mongoose.Types;

router.get("/item/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid roadmap item ID" });
    }

    const comments = await Comment.find({ roadmapItem: itemId })
      .populate("user", "email")
      .sort({ createdAt: -1 })
      .lean();

    const commentsWithUserEmail = comments.map((c) => ({
      ...c,
      userEmail: c.user?.email || "Unknown User",
    }));

    res.json(commentsWithUserEmail);
  } catch (err) {
    console.error("GET /item/:itemId error:", err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

router.post("/", auth, async (req, res) => {
  const { text, roadmapItemId, parentId } = req.body;

  if (!text || !roadmapItemId) {
    return res
      .status(400)
      .json({ message: "Text and roadmapItemId are required" });
  }

  try {
    const comment = new Comment({
      user: req.user.id,
      text,
      roadmapItem: roadmapItemId,
      parent: parentId || null,
    });

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
      parentComment.replies.push(comment._id);
      await parentComment.save();
    }

    await comment.save();
    await comment.populate("user", "email");

    const commentObj = comment.toObject();
    commentObj.userEmail = comment.user?.email || "Unknown User";

    res.status(201).json(commentObj);

    const roadmapItem = await RoadmapItem.findById(roadmapItemId);
    if (!roadmapItem) {
      return res.status(404).json({ message: "Roadmap item not found" });
    }

    roadmapItem.comments.push(comment._id);
    await roadmapItem.save();

  } catch (err) {
    console.error("POST /comments error:", err);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    console.error("PUT /comments/:id error:", err);
    res.status(500).json({ message: "Edit failed" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (comment.parent) {
      await Comment.findByIdAndUpdate(comment.parent, {
        $pull: { replies: comment._id },
      });
    }

    await RoadmapItem.findByIdAndUpdate(comment.roadmapItem, {
      $pull: { comments: comment._id },
    });

    await comment.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /comments/:id error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
