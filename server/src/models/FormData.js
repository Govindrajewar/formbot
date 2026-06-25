const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: String,
  type: String,
  src: String,
  placeholder: String,
  value: String,
});

const FormData = mongoose.model("FormData", {
  formName: String,
  user: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  itemList: [itemSchema],
});

module.exports = FormData;
