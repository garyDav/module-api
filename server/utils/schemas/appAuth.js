const Joi = require('joi')

const authUserSchema = {
  email: Joi
    .string()
    .email({ tlds: { allow: false } })
    .max(70)
    .min(10),
  password: Joi
    .string()
    .max(50)
    .min(5),
  idDevice: Joi
    .string()
    .max(70)
    .min(5),
  usuario: Joi
    .string()
    .max(50)
    .min(5),
  token: Joi
    .string()
    .max(70)
    .min(5)
}

module.exports = {
  authUserSchema
}
