const express = require("express");
const router = express.Router();

const {
  createComments,
  getComments,
} = require("../controller/commentsController");

router.post("/create-comment", createComments);
router.get("/get-comment/:id", getComments);

module.exports = router;
