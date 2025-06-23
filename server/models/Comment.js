const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  roadmapItem: { type: mongoose.Schema.Types.ObjectId, ref: "RoadmapItem", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);


