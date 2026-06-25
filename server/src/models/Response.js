const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  itemId: String,
  type: String,
  value: String,
});

const responseSchema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.Types.ObjectId, ref: "FormData", required: true, index: true },
    answers: [answerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
