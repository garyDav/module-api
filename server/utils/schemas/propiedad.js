const Joi = require('joi')

const createPropiedadSchema = {
  pacienteId: Joi
    .number()
    .min(1)
    .required(),
  nombre: Joi
    .string()
    .max(255)
    .required(),
  valor: Joi
    .string()
    .max(255)
    .required()
}

module.exports = {
  createPropiedadSchema
}
