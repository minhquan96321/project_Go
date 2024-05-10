const Categori = require("../model/categoriModel");

const createCategori = async (req, res) => {
  try {
    const { title, alias, position } = req.body;
    if (!title || !alias || !position) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter complete data" });
    }

    const categori = await Categori.create({
      title: title,
      alias: alias,
      position: position,
    });

    return res.status(200).json({ success: true, message: categori });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const getCategori = async (req, res) => {
  try {
    const categoriAll = await Categori.find({});
    return res.status(200).json({ success: true, message: categoriAll });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const updateCategori = async (req, res) => {
  try {
    const { idCategori, title, alias, position } = req.body;

    const categori = await Categori.findById({ _id: idCategori });
    if (!categori) {
      return res
        .status(404)
        .json({ success: false, message: "Data does not exist" });
    }

    await Categori.updateOne(
      { _id: idCategori },
      { title: title, alias: alias, position: position }
    );

    return res
      .status(200)
      .json({ success: true, message: "Updated data successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const deleteCategori = async (req, res) => {
  try {
    const { idCategori } = req.body;
    const categoriDelete = await Categori.findById({ _id: idCategori });
    if (!categoriDelete) {
      return res
        .status(404)
        .json({ success: false, message: " Category does not exist" });
    }

    await Categori.deleteOne({ _id: idCategori });
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

module.exports = {
  createCategori,
  getCategori,
  updateCategori,
  deleteCategori,
};
