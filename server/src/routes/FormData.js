const express = require("express");
const router = express.Router();

const {
  setFormData,
  updateFormData,
  getFormData,
  deleteFormData,
  getCurrentFormData,
} = require("../controllers/FormData.js");
const requireAuth = require("../middleware/auth.js");
const validate = require("../middleware/validate.js");
const { setFormDataSchema } = require("../validation/formDataValidation.js");

router.post("/dynamic-items", requireAuth, validate(setFormDataSchema), setFormData);

router.patch(
  "/formdata/:currentFormId",
  requireAuth,
  validate(setFormDataSchema),
  updateFormData
);

router.get("/formdata", requireAuth, getFormData);

// Public: this is the share/fill-out link for a form, accessed without an account.
router.get("/viewForm/:currentFormId", getCurrentFormData);

router.delete("/formdata/:currentFormId", requireAuth, deleteFormData);

module.exports = router;
