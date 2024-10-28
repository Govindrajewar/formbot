const express = require("express");
const router = express.Router();

const {
  setFormData,
  getFormData,
  deleteFormData,
  getCurrentFormData,
} = require("../controllers/FormData.js");

router.post("/dynamic-items", setFormData);

router.get("/formdata", getFormData);

router.get("/viewForm/:currentFormId", getCurrentFormData);

router.delete("/formdata/:currentFormId", deleteFormData);

module.exports = router;
