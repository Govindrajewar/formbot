const express = require("express");
const router = express.Router();

const { createFolder, getFolders, deleteFolder } = require("../controllers/Folder.js");
const requireAuth = require("../middleware/auth.js");

router.post("/folders", requireAuth, createFolder);

router.get("/folders", requireAuth, getFolders);

router.delete("/folders/:folderId", requireAuth, deleteFolder);

module.exports = router;
