const mongoose = require("mongoose");

const aboutShema = new mongoose.Schema(
  {
    author: { type: String, trim: true },
    position: { type: String, trim: true },
    story: { type: String, trim: true },
    avatar: {
      type: String,
      trim: true,
      default:
        " https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const about = mongoose.model("about", aboutShema);

module.exports = about;
