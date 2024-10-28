const bcrypt = require("bcrypt");
const User = require("../models/User.js");
var jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: encryptedPassword,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "User Signed Up successfully",
    });
  } catch (error) {
    res.json({
      status: "ERROR",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.json({
        status: "FAILED",
        message: "User is not Available, Please, Sign Up first",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.json({
        status: "FAILED",
        message: "You have entered a wrong password",
      });
      return;
    }

    const jwToken = jwt.sign(user, process.env.jwtPrivateKey, {
      expiresIn: 6000,
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "User Logged in Successfully",
      token: jwToken,
      user: user,
    });
  } catch (error) {
    res.json({
      status: "ERROR",
      message: error.message,
    });
  }
};

// TODO: Added for testing purposes. Remove at Deployment
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "SUCCESS",
      data: users,
    });
  } catch (error) {
    res.json({
      status: "ERROR",
      message: error.message,
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
  // TODO: Added for testing purposes. Remove at Deployment
  getUsers,
};
