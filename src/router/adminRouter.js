const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/userMiddleware");
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
  getAdminAllBlog,
  getAdminPost,
} = require("../controller/adminController");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/get-admin", verifyToken, getAdmin);
router.get("/get-allPost", verifyToken, getAdminAllBlog);
router.get("/get-pagination", verifyToken, getAdminPost);

module.exports = router;
