const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createHospitalSchema = {
  nombre: Joi
    .string()
    .max(100)
    .required(),
  celular: Joi
    .string()
    .max(15),
  telefono: Joi
    .string()
    .max(15),
  direccion: Joi
    .string()
    .max(100)
    .required(),
  horarioAtencion: Joi
    .string()
    .max(100)
    .required(),
  latitud: Joi
    .string()
    .max(50),
  longitud: Joi
    .string()
    .max(50)
}

const updateHospitalSchema = {
  nombre: Joi
    .string()
    .max(100),
  celular: Joi
    .string()
    .max(15),
  telefono: Joi
    .string()
    .max(15),
  direccion: Joi
    .string()
    .max(100),
  horarioAtencion: Joi
    .string()
    .max(100),
  latitud: Joi
    .string()
    .max(50),
  longitud: Joi
    .string()
    .max(50)
}

module.exports = {
  idSchema,
  createHospitalSchema,
  updateHospitalSchema
}
