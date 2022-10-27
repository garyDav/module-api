const Joi = require('joi')

const authUserSchema = {
  email: Joi
    .string()
    .email({ tlds: { allow: false } })
    .max(70)
    .min(10)
    .required(),
  password: Joi
    .string()
    .max(50)
    .min(5)
    .required()
}

module.exports = {
  authUserSchema
}
