const Joi = require('joi')

const UpdateLaboratoriosPacienteSchema = {
  estado: Joi
    .string()
    .max(15)
    .min(3)
    .required()
}

module.exports = {
  UpdateLaboratoriosPacienteSchema
}

