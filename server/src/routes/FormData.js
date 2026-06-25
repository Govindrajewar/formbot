const express = require("express");
const router = express.Router();

const {
  setFormData,
  getFormData,
  deleteFormData,
  getCurrentFormData,
} = require("../controllers/FormData.js");
const requireAuth = require("../middleware/auth.js");

router.post("/dynamic-items", requireAuth, setFormData);

router.get("/formdata", requireAuth, getFormData);

// Public: this is the share/fill-out link for a form, accessed without an account.
router.get("/viewForm/:currentFormId", getCurrentFormData);

router.delete("/formdata/:currentFormId", requireAuth, deleteFormData);

module.exports = router;
