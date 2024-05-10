require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "vue3",
};

const uploadImage = async (image) => {
  //   console.log(image);
  try {
    // console.log(image);
    if (!image) {
      return;
    } else {
      const result = await cloudinary.uploader.upload(image, opts);
      // console.log(result);
      return result;
    }
  } catch (error) {
    console.log("error :", error);
  }
};

const deleteCloudinary = async (plic_id) => {
  try {
    await cloudinary.uploader.destroy(plic_id);
    return "Xóa thành công";
  } catch (error) {
    console.log("error :", error);
  }
};

module.exports = {
  uploadImage,
  deleteCloudinary,
};
