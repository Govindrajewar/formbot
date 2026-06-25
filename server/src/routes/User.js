const express = require("express");
const router = express.Router();

const { signupUser, loginUser, updateUser } = require("../controllers/User.js");
const authLimiter = require("../middleware/rateLimiter.js");
const requireAuth = require("../middleware/auth.js");
const validate = require("../middleware/validate.js");
const {
  signupSchema,
  loginSchema,
  updateUserSchema,
} = require("../validation/userValidation.js");

router.post("/signup", authLimiter, validate(signupSchema), signupUser);

router.post("/login", authLimiter, validate(loginSchema), loginUser);

router.patch("/user", requireAuth, validate(updateUserSchema), updateUser);

module.exports = router;
