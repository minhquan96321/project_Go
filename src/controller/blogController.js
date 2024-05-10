const Blog = require("../model/BlogModel");
const Categori = require("../model/categoriModel");
const Admin = require("../model/adminModel");
const {
  uploadImage,
  deleteCloudinary,
} = require("../pathHandling/uploadImages");

const createBlog = async (req, res) => {
  try {
    const { titleBlog, categori, content, nameAuthor, image } = req.body;
    // console.log(titleBlog, categori, content, nameAuthor);
    const author = await Admin.findById({ _id: req.admin._id });
    if (!titleBlog || !categori || !content || !image) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter complete information" });
    }
    const titleCategori = await Categori.findOne({
      title: { $regex: categori, $options: "i" },
    });
    const imagesPath = await uploadImage(image);
    // console.log("Ok Rồi nhá" + imagesPath.secure_url);
    const blog = await Blog.create({
      titleBlog: titleBlog,
      categori: titleCategori._id,
      nameAuthor: author.username,
      content: content,
      image: {
        blogUrl: imagesPath.secure_url,
        public_id: imagesPath.public_id,
      },
    });

    return res.status(200).json({ success: true, message: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error creating" });
  }
};

const getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find({}).populate("categori", ["title"]);
    return res.status(200).json({ success: true, message: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error });
  }
};

// const getAdminPost = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);

//     // console.log("page:" + page, "limit:" + limit);

//     const results = {};
//     const dataLength = await Blog.find({});

//     const startBlog = (page - 1) * limit;
//     const endBlog = page * limit;

//     if (endBlog < dataLength.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//     if (startBlog > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     results.results = await Blog.find({})
//       .populate("categori", ["title"])
//       .sort({ $natural: -1 })
//       .limit(limit)
//       .skip(startBlog)
//       .exec();

//     return res.status(200).json({ success: true, message: results });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error getting Blog" });
//   }
// };

const getsubpageBlog = async (req, res) => {
  // console.log(titleCategori);
  try {
    const titleCategori = req.query.categori;
    // const page = parseInt(req.query.page);
    const page = req.query.page;
    const limit = parseInt(req.query.limit);
    // console.log("page:" + page, "limit:" + limit);
    // console.log(titleCategori);
    const results = {};
    const startBlog = (page - 1) * limit;
    const endBlog = page * limit;
    const categori = await Categori.findOne({
      title: { $regex: titleCategori, $options: "i" },
    });

    if (!categori) {
      return res
        .status(404)
        .json({ success: false, message: "Categori does not exist" });
    }

    const subpage = await Blog.find({ categori: categori._id });
    if (endBlog < subpage.length) {
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

    results.results = await Blog.find({ categori: categori._id })
      .populate("categori", ["title"])
      .sort({ $natural: -1 })
      .limit(limit)
      .skip(startBlog)
      .exec();

    return res.status(200).json({ success: true, message: results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error getting" });
  }
};

const getDetailBlog = async (req, res) => {
  // console.log(id);
  try {
    const { id } = req.params;
    const details = await Blog.findById({ _id: id }).populate(
      "categori",
      "title"
    );
    return res.status(200).json({ success: true, message: details });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error getting Detail" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { idBlog, titleBlog, categori, content, nameAuthor, image } =
      req.body;
    // console.log(idBlog, titleBlog, categori);
    const IdCategori = await Categori.findOne({
      title: { $regex: categori, $options: "i" },
    });
    const blog = await Blog.findById({ _id: idBlog });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Did not find the article" });
    }

    const imagesPath = await uploadImage(image);
    // console.log("imagesPath :", imagesPath);

    if (image) await deleteCloudinary(blog.image.public_id);

    await Blog.updateOne(
      { _id: idBlog },
      {
        titleBlog: titleBlog,
        categori: IdCategori?.id,
        content: content,
        nameAuthor: nameAuthor,
        image: imagesPath
          ? {
              blogUrl: imagesPath.secure_url,
              public_id: imagesPath.public_id,
            }
          : undefined,
      }
    );
    console.log("updated successfully");
    return res
      .status(200)
      .json({ success: true, message: "Updated article successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { idBlog } = req.params;
    // console.log(idBlog);
    const blog = await Blog.findById({ _id: idBlog });
    console.log(blog.image.public_id);
    if (!idBlog) {
      return res
        .status(404)
        .json({ success: false, message: "The article does not exist" });
    }

    await deleteCloudinary(blog.image.public_id);
    await Blog.deleteOne({ _id: idBlog });
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting Detail" });
  }
};

module.exports = {
  createBlog,
  getAllBlog,
  getsubpageBlog,
  getDetailBlog,
  // getAdminPost,
  deleteBlog,
  updateBlog,
};
