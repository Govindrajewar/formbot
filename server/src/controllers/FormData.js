const FormData = require("../models/FormData.js");

const setFormData = async (req, res) => {
  try {
    if (!req.body.formName || !req.body.itemList) {
      return res.status(400).send("Invalid data format");
    }

    const formData = new FormData({
      formName: req.body.formName,
      itemList: req.body.itemList,
      user: req.user.userName,
      userId: req.user.id,
    });
    await formData.save();
    res.status(201).send(formData);
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(400).send(error.message);
  }
};

const getFormData = async (req, res) => {
  try {
    const data = await FormData.find({ userId: req.user.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};

const deleteFormData = async (req, res) => {
  try {
    const currentFormId = req.params.currentFormId;
    const form = await FormData.findOne({ _id: currentFormId });

    if (!form) {
      return res.status(404).send("Form not found");
    }

    if (String(form.userId) !== req.user.id) {
      return res.status(403).send("You are not allowed to delete this form");
    }

    await FormData.deleteOne({ _id: currentFormId });
    res.status(200).send("Form deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCurrentFormData = async (req, res) => {
  try {
    const data = await FormData.findOne({ _id: req.params.currentFormId });
    if (!data) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving form", error: error.message });
  }
};

module.exports = {
  setFormData,
  getFormData,
  deleteFormData,
  getCurrentFormData,
};
