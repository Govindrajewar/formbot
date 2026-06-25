const express = require("express");
const router = express.Router();

const { signupUser, loginUser, updateUser } = require("../controllers/User.js");
const authLimiter = require("../middleware/rateLimiter.js");
const requireAuth = require("../middleware/auth.js");

router.post("/signup", authLimiter, signupUser);

router.post("/login", authLimiter, loginUser);

router.patch("/user", requireAuth, updateUser);

module.exports = router;
