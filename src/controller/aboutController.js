const About = require("../model/aboutModel");

const createAbout = async (req, res) => {
  try {
    const { author, position, story } = req.body;

    if (!author || !position || !story) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter complete data" });
    }

    const aboutCreate = await About.create({
      author: author,
      position: position,
      story: story,
    });

    return res.status(200).json({ success: true, message: aboutCreate });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const getAbout = async (req, res) => {
  try {
    const allAbout = await About.find({});

    return res.status(200).json({ success: true, message: allAbout });
  } catch (error) {
    return res.status(500).json({ success: false, message: "About not found" });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { idAbout, author, position, story, avatar } = req.body;
    // const  {id}  = req.files;
    // const images = req.files.images;
    // console.log(id);

    const authorAbout = About.findById({ _id: idAbout });

    if (!authorAbout) {
      return res
        .status(404)
        .json({ success: false, message: "The author does not exist" });
    }

    await About.updateOne(
      { _id: idAbout },
      {
        author: author,
        position: position,
        story: story,
        avatar: avatar,
      }
    );
    return res
      .status(200)
      .json({ success: true, message: " Updated data successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const deleteAbout = async (req, res) => {
  try {
    const { idAbout } = req.body;

    await About.deleteOne({ _id: idAbout });
    return res
      .status(200)
      .json({ success: true, message: "Delete successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

module.exports = {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
};
