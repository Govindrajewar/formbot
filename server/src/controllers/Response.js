const mongoose = require("mongoose");
const Response = require("../models/Response.js");
const FormData = require("../models/FormData.js");

const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const { answers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid form ID" });
    }

    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ status: "FAILED", message: "Form not found" });
    }

    const response = await Response.create({ formId, answers });
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error saving response" });
  }
};

const getResponses = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid form ID" });
    }

    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ status: "FAILED", message: "Form not found" });
    }

    if (String(form.userId) !== req.user.id) {
      return res
        .status(403)
        .json({ status: "FAILED", message: "You are not allowed to view these responses" });
    }

    const responses = await Response.find({ formId }).sort({ createdAt: -1 });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error retrieving responses" });
  }
};

module.exports = {
  submitResponse,
  getResponses,
};
