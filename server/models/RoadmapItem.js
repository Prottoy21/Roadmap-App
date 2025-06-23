const mongoose = require("mongoose");

const roadmapItemSchema = new mongoose.Schema({
  title: String,
  status: String,
  upvotes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

module.exports = mongoose.model("RoadmapItem", roadmapItemSchema);


