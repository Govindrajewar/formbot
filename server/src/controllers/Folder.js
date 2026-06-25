const mongoose = require("mongoose");
const Folder = require("../models/Folder.js");
const { parsePagination, buildPaginatedResponse } = require("../utils/pagination.js");

const createFolder = async (req, res) => {
  try {
    const folder = await Folder.create({ name: req.body.name, userId: req.user.id });
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error creating folder" });
  }
};

const getFolders = async (req, res) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);

    const [folders, total] = await Promise.all([
      Folder.find({ userId: req.user.id }).sort({ createdAt: 1 }).skip(skip).limit(limit),
      Folder.countDocuments({ userId: req.user.id }),
    ]);

    res.status(200).json(buildPaginatedResponse(folders, total, page, limit));
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error retrieving folders" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.folderId;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid folder ID" });
    }

    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({ status: "FAILED", message: "Folder not found" });
    }

    if (String(folder.userId) !== req.user.id) {
      return res
        .status(403)
        .json({ status: "FAILED", message: "You are not allowed to delete this folder" });
    }

    await Folder.deleteOne({ _id: folderId });
    res.status(200).json({ status: "SUCCESS", message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "Error deleting folder" });
  }
};

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,
};
