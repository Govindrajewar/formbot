const express = require("express");
const router = express.Router();

const { signupUser, loginUser } = require("../controllers/User.js");
const authLimiter = require("../middleware/rateLimiter.js");

router.post("/signup", authLimiter, signupUser);

router.post("/login", authLimiter, loginUser);

module.exports = router;
