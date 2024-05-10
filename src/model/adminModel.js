const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avtar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    power: { type: Boolean, default: false },
    dateofbirth: { type: String, default: null },
    gender: { type: String, default: "male" },
  },
  {
    timestamps: true,
  }
);

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
