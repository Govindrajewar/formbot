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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null, index: true },
  theme: { type: String, enum: ["light", "dark", "blue"], default: "light" },
  itemList: [itemSchema],
});

module.exports = FormData;
