const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createUserSchema = {
  nombre: Joi
    .string()
    .max(100)
    .required(),
  email: Joi
    .string()
    .email({ tlds: { allow: false } })
    .max(30)
    .required(),
  password: Joi
    .string()
    .required()
}

const updateUserSchema = {
  nombre: Joi
    .string()
    .max(100),
  email: Joi
    .string()
    .email({ tlds: { allow: false } })
    .max(30),
  password: Joi
    .string()
}

module.exports = {
  idSchema,
  createUserSchema,
  updateUserSchema
}
