const Joi = require("joi");

const createFolderSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
});

module.exports = {
  createFolderSchema,
};
