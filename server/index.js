const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const roadmapRoutes = require("./routes/roadmap");

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/roadmap", roadmapRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch((err) => console.error("DB connection error:", err));


