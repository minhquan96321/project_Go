const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    titleBlog: { type: String, trim: true },
    categori: { type: mongoose.Schema.Types.ObjectId, ref: "categori" },
    content: { type: String, trim: true },
    nameAuthor: { type: String, trim: true },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png",
    },
    image: {
      blogUrl: {
        type: String,
        default: null,
      },
      public_id: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
