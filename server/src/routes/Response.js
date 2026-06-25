const express = require("express");
const router = express.Router();

const { submitResponse, getResponses } = require("../controllers/Response.js");
const requireAuth = require("../middleware/auth.js");
const validate = require("../middleware/validate.js");
const { submitResponseSchema } = require("../validation/responseValidation.js");

// Public: anyone filling out a shared form can submit answers, no account needed.
router.post("/formdata/:formId/responses", validate(submitResponseSchema), submitResponse);

router.get("/formdata/:formId/responses", requireAuth, getResponses);

module.exports = router;
