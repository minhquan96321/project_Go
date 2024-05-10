const jwt = require("jsonwebtoken");
const Admin = require("../model/adminModel");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    // console.log(decoded);
    req.admin = await Admin.findById(decoded.id).select("-password");
    // console.log("admin: ", req.admin);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "You are not authenticated" });
  }
};

module.exports = {
  verifyToken,
};
