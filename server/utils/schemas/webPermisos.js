const Joi = require('joi')

const PermisoSchema = {
  nombre: Joi
    .string()
    .max(100)
    .min(2)
    .required()
}

module.exports = {
  PermisoSchema
}
