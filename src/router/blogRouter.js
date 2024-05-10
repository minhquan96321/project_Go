const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/userMiddleware");

const {
  createBlog,
  getAllBlog,
  getsubpageBlog,
  getDetailBlog,
  deleteBlog,
  updateBlog,
  // getAdminPost,
} = require("../controller/blogController");

router.post("/create-blog", verifyToken, createBlog);
router.get("/all-blog", getAllBlog);
router.get("/subpage-blog", getsubpageBlog);
router.get("/get-datail/:id", getDetailBlog);
// router.get("/page-blog", getAdminPost);
router.delete("/delete-blog/:idBlog", verifyToken, deleteBlog);
router.put("/update-blog", verifyToken, updateBlog);

module.exports = router;
