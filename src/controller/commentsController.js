const Comments = require("../model/commentModel");
const { uploadImage } = require("../pathHandling/uploadImages");

const createComments = async (req, res) => {
  try {
    const { postid, author, email, message, image } = req.body;
    console.log(
      "postid, author, email, message",
      postid,
      author,
      email,
      message
    );

    if (!postid || !author || !email) {
      return res.status(404).json({
        success: false,
        message: "Please enter complete information",
      });
    }
    if (!image && !message) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter a comment" });
    }
    const imagesPath = await uploadImage(image);

    const comment = await Comments.create({
      postid: postid,
      author: author,
      email: email,
      message: message,
      // image: imagesPath.secure_url,
      image: imagesPath ? imagesPath.secure_url : "",
    });

    return res.status(200).json({ success: true, message: comment });
    // console.log("Uploading images: " + imagesPath);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error creating comment" });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comments.find({ postid: id });
    return res.status(200).json({ success: true, message: comments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error getting comment" });
  }
};

module.exports = {
  createComments,
  getComments,
};
