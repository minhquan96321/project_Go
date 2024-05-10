const mongoose = require("mongoose");

const categoriShema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    alias: { type: String, trim: true },
    position: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const categori = mongoose.model("categori", categoriShema);

module.exports = categori;
