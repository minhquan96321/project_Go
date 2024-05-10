const express = require("express");

const router = express.Router();
const {
  createContact,
  getContact,
} = require("../controller/contactController");

router.post("/create-contact", createContact);
router.get("/get-contact", getContact);

module.exports = router;
