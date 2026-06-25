const express = require("express");
const router = express.Router();

const { createFolder, getFolders, deleteFolder } = require("../controllers/Folder.js");
const requireAuth = require("../middleware/auth.js");
const validate = require("../middleware/validate.js");
const { createFolderSchema } = require("../validation/folderValidation.js");

router.post("/folders", requireAuth, validate(createFolderSchema), createFolder);

router.get("/folders", requireAuth, getFolders);

router.delete("/folders/:folderId", requireAuth, deleteFolder);

module.exports = router;
