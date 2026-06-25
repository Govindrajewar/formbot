const Folder = require("../models/Folder.js");

const createFolder = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Folder name cannot be empty" });
    }

    const folder = await Folder.create({ name: name.trim(), userId: req.user.id });
    res.status(201).json(folder);
  } catch (error) {
    res.status(400).json({ message: "Error creating folder", error: error.message });
  }
};

const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving folders", error: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.folderId);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    if (String(folder.userId) !== req.user.id) {
      return res.status(403).json({ message: "You are not allowed to delete this folder" });
    }

    await Folder.deleteOne({ _id: req.params.folderId });
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting folder", error: error.message });
  }
};

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,
};
