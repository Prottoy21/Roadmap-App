const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const RoadmapItem = require("../models/RoadmapItem");

router.post("/:id/upvote", auth, async (req, res) => {
  try {
    const item = await RoadmapItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.upvotes += 1;
    await item.save();
    res.json({ upvotes: item.upvotes });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
