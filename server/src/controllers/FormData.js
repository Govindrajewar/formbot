const mongoose = require("mongoose");
const FormData = require("../models/FormData.js");

const setFormData = async (req, res) => {
  try {
    const formData = new FormData({
      formName: req.body.formName,
      itemList: req.body.itemList,
      user: req.user.userName,
      userId: req.user.id,
    });
    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(400).json({ status: "ERROR", message: error.message });
  }
};

const getFormData = async (req, res) => {
  try {
    const data = await FormData.find({ userId: req.user.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error retrieving forms" });
  }
};

const deleteFormData = async (req, res) => {
  try {
    const currentFormId = req.params.currentFormId;

    if (!mongoose.Types.ObjectId.isValid(currentFormId)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid form ID" });
    }

    const form = await FormData.findOne({ _id: currentFormId });

    if (!form) {
      return res.status(404).json({ status: "FAILED", message: "Form not found" });
    }

    if (String(form.userId) !== req.user.id) {
      return res
        .status(403)
        .json({ status: "FAILED", message: "You are not allowed to delete this form" });
    }

    await FormData.deleteOne({ _id: currentFormId });
    res.status(200).json({ status: "SUCCESS", message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error deleting form" });
  }
};

const getCurrentFormData = async (req, res) => {
  try {
    const currentFormId = req.params.currentFormId;

    if (!mongoose.Types.ObjectId.isValid(currentFormId)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid form ID" });
    }

    const data = await FormData.findOne({ _id: currentFormId });
    if (!data) {
      return res.status(404).json({ status: "FAILED", message: "Form not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error retrieving form" });
  }
};

module.exports = {
  setFormData,
  getFormData,
  deleteFormData,
  getCurrentFormData,
};
