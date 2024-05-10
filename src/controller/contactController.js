const Contact = require("../model/contactModel");

const createContact = async (req, res) => {
  try {
    const { username, email, subject, message } = req.body;
    // console.log(username, email, subject, message);

    if (!username || !email || !subject || !message) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter complete information" });
    }

    const contact = await Contact.create({
      username: username,
      email: email,
      subject: subject,
      message: message,
    });

    return res.status(200).json({ success: true, message: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.find({});
    return res.status(200).json({ success: true, message: contact });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Contact not found" });
  }
};

module.exports = {
  createContact,
  getContact,
};
