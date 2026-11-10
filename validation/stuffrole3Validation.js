const Joi = require("joi");

const createStuffRole3ValidationSchema = Joi.object({
  stuff_id: Joi.string().required().trim(),
  role_id: Joi.string().required().trim(),
});

const updateStuffRole3ValidationSchema = Joi.object({
  stuff_id: Joi.string().optional().trim(),
  role_id: Joi.string().optional().trim(),
});

module.exports = {
  createStuffRole3ValidationSchema,
  updateStuffRole3ValidationSchema,
};