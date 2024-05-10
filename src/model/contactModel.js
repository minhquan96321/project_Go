const mongoose = require("mongoose");

const contacShema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

const contact = mongoose.model("contact", contacShema);

module.exports = contact;

