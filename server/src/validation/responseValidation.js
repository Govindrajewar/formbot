const Joi = require("joi");

const answerSchema = Joi.object({
  itemId: Joi.string().required(),
  type: Joi.string().required(),
  value: Joi.string().allow("").max(1000),
});

const submitResponseSchema = Joi.object({
  answers: Joi.array().items(answerSchema).min(1).max(100).required(),
});

module.exports = {
  submitResponseSchema,
};
