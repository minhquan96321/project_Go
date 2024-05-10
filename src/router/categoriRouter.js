const express = require("express");
const router = express.Router();

const {
  createCategori,
  getCategori,
  updateCategori,
} = require("../controller/categoriController");

router.post("/create-categori", createCategori);
router.get("/get-categori", getCategori);
router.put("/update-categori", updateCategori);

module.exports = router;
