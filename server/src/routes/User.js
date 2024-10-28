const express = require("express");
const router = express.Router();

const { signupUser, loginUser, getUsers } = require("../controllers/User.js");

router.post("/signup", signupUser);

router.post("/login", loginUser);

// TODO: Added for testing purposes. Remove at Deployment
router.get("/users", getUsers);

module.exports = router;
