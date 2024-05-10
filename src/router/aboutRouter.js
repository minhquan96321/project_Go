const express = require("express");
const router = express.Router();

const {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} = require("../controller/aboutController");

router.post("/create-about", createAbout);
router.get("/get-about", getAbout);
router.put("/update-about", updateAbout);
router.delete("/delete-about", deleteAbout);

module.exports = router;
