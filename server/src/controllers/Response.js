const Response = require("../models/Response.js");
const FormData = require("../models/FormData.js");

const submitResponse = async (req, res) => {
  try {
    const { formId } = req.params;
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Invalid response data" });
    }

    const form = await FormData.findById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    const response = await Response.create({ formId, answers });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: "Error saving response", error: error.message });
  }
};

const getResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await FormData.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    if (String(form.userId) !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to view these responses" });
    }

    const responses = await Response.find({ formId }).sort({ createdAt: -1 });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving responses", error: error.message });
  }
};

module.exports = {
  submitResponse,
  getResponses,
};
