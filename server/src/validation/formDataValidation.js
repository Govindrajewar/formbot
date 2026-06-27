const Joi = require("joi");

const ITEM_TYPES = [
  "text",
  "image",
  "video",
  "gif",
  "textInput",
  "numberInput",
  "emailInput",
  "phoneInput",
  "dateInput",
  "ratingInput",
  "buttonInput",
];

const itemSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string()
    .valid(...ITEM_TYPES)
    .required(),
  src: Joi.string().allow(""),
  placeholder: Joi.string().allow(""),
  value: Joi.string().allow(""),
});

const setFormDataSchema = Joi.object({
  formName: Joi.string().trim().min(1).max(200).required(),
  itemList: Joi.array().items(itemSchema).min(1).max(100).required(),
  folderId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null, "")
    .optional(),
});

module.exports = {
  setFormDataSchema,
};
