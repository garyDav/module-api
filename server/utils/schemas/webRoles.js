const Joi = require('joi')

const RolSchema = {
  nombre: Joi
    .string()
    .max(100)
    .min(2)
    .required()
}

module.exports = {
  RolSchema
}
