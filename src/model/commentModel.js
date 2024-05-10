const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postid: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
    author: { type: String },
    email: { type: String },
    message: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const comments = mongoose.model("comment", commentSchema);

module.exports = comments;
