const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createSpecialtySchema = {
  nombre: Joi
    .string()
    .max(50)
    .required()
}

const updateSpecialtySchema = {
  nombre: Joi
    .string()
    .max(50)
}

module.exports = {
  idSchema,
  createSpecialtySchema,
  updateSpecialtySchema
}
