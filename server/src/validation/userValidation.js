const Joi = require("joi");

// At least 8 characters, with at least one letter and one number.
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const passwordSchema = Joi.string().pattern(PASSWORD_PATTERN).required().messages({
  "string.pattern.base":
    "Password must be at least 8 characters and include at least one letter and one number",
});

const signupSchema = Joi.object({
  userName: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: passwordSchema,
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  userName: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  oldPassword: Joi.string().required(),
  newPassword: passwordSchema,
});

module.exports = {
  signupSchema,
  loginSchema,
  updateUserSchema,
};
