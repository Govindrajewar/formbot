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
    if (error.code === 11000) {
      return res.status(409).json({
        status: "FAILED",
        message: "That username or email is already in use",
      });
    }
    res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while signing up",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    // Same message for both cases so a caller can't tell whether an email is registered.
    const invalidCredentials = () =>
      res.status(401).json({
        status: "FAILED",
        message: "Invalid email or password",
      });

    if (!user) {
      return invalidCredentials();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return invalidCredentials();
    }

    delete user.password;

    const jwToken = jwt.sign(
      { id: user._id, email: user.email, userName: user.userName },
      process.env.jwtPrivateKey,
      { expiresIn: 6000 }
    );

    res.status(201).json({
      status: "SUCCESS",
      message: "User Logged in Successfully",
      token: jwToken,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while logging in",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userName, email, oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ status: "FAILED", message: "Old password is incorrect" });
    }

    user.userName = userName;
    user.email = email;
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    const jwToken = jwt.sign(
      {
        id: updatedUser._id,
        email: updatedUser.email,
        userName: updatedUser.userName,
      },
      process.env.jwtPrivateKey,
      { expiresIn: 6000 }
    );

    res.status(200).json({
      status: "SUCCESS",
      message: "Profile updated successfully",
      token: jwToken,
      user: updatedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "FAILED",
        message: "That username or email is already in use",
      });
    }
    res.status(500).json({
      status: "ERROR",
      message: "Something went wrong while updating your profile",
    });
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
};
