const Joi = require('joi')

const passwordSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUsuarioSchema = {
  nombre: Joi
    .string()
    .max(100)
    .min(2)
    .required(),
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
    .required(),
  rol_id: Joi
    .number()
    .min(1)
}

const updateUsuarioSchema = {
  nombre: Joi
    .string()
    .max(100)
    .min(2)
    .required(),
  email: Joi
    .string()
    .email({ tlds: { allow: false } })
    .max(70)
    .min(10)
    .required()
}

module.exports = {
  createUsuarioSchema,
  updateUsuarioSchema,
  passwordSchema
}
