require("dotenv").config();
const Admin = require("../model/adminModel");
const Blog = require("../model/BlogModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, dateofbirth, gender } = req.body;
    console.log(username, email, password);
    const emailAdmin = await Admin.findOne({ email: email });
    if (!username || !email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Please complete all information" });
    }
    if (emailAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const response = await Admin.create({
      username: username,
      email: email,
      password: hashed,
      dateofbirth: dateofbirth,
      gender: gender,
    });

    return res.status(200).json({ success: true, message: response });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Registers failed" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }
    const validerPassword = await bcrypt.compare(password, admin.password);
    if (!validerPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password" });
    }
    let accessToken = jwt.sign({ id: admin._id }, process.env.ACCESS_KEY, {
      expiresIn: "12h",
    });
    return res.status(200).json({
      success: true,
      message: {
        username: admin.username,
        userId: admin._id,
        avatar: admin.avtar,
        accessToken,
        email,
        message: "Logged in successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById({ _id: req.admin._id });
    // console.log(req.admin.id);
    return res.status(200).json({ success: true, message: admin });
  } catch (error) {
    return res.status(500).json({ success: false, message: "getAdmin failed" });
  }
};

const getAdminAllBlog = async (req, res) => {
  try {
    // const { nameAuthor } = req.body;
    const admin = await Admin.findById({ _id: req.admin._id });
    // console.log("admin :", admin);
    const blog = await Blog.find({ nameAuthor: admin.username }).populate(
      "categori",
      ["title"]
    );
    return res.status(200).json({ success: true, message: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error });
  }
};

const getAdminPost = async (req, res) => {
  try {
    // const nameAuthor = "Cao Minh Quân";
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
   
    const admin = await Admin.findById({ _id: req.admin._id });

    console.log("page:" + page, "limit:" + limit);

    const results = {};
    const dataLength = await Blog.find({ nameAuthor: admin.username });

    const startBlog = (page - 1) * limit;
    const endBlog = page * limit;

    if (endBlog < dataLength.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startBlog > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = await Blog.find({ nameAuthor: admin.username })
      .populate("categori", ["title"])
      .sort({ $natural: -1 })
      .limit(limit)
      .skip(startBlog)
      .exec();

    return res.status(200).json({ success: true, message: results });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error getting Blog" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
  getAdminAllBlog,
  getAdminPost,
};
