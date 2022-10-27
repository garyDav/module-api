const Joi = require('joi')

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()

const createProfileSchema = {
  nombre: Joi
    .string()
    .max(50)
    .required(),
  apellido: Joi
    .string()
    .max(50)
    .required(),
  ci: Joi
    .string()
    .max(15)
    .required(),
  fechaNacimiento: Joi
    .string()
    .max(10),
  genero: Joi
    .string()
    .max(10),
  usuarioId: idSchema
}

const updateProfileSchema = {
  nombre: Joi
    .string()
    .max(50),
  apellido: Joi
    .string()
    .max(50),
  ci: Joi
    .string()
    .max(15),
  fechaNacimiento: Joi
    .string()
    .max(10),
  genero: Joi
    .string()
    .max(10)
}

const WorkingInformation = {
  profileId: idSchema,
  especialidades: Joi
    .array()
    .required()
    .items({
      _id: idSchema,
      nombre: Joi.string().max(50)
    }),
  afiliaciones: Joi
    .array()
    .items({
      hospital: Joi
        .string()
        .max(100),
      telefono: Joi
        .string()
        .max(15)
    })
}

const AdditionalInformation = {
  profileId: idSchema,
  educacion: Joi
    .array()
    .required()
    .items({
      entidad: Joi
        .string()
        .max(100),
      titulo: Joi
        .string()
        .max(100),
      anio: Joi
        .string()
        .max(4),
    }),
  licenciaMedica: {
    pais: Joi
      .string()
      .max(50),
    numeroLicencia: Joi
      .string()
      .max(50),
    archivo: Joi
      .string()
      .max(100)
  }
}

module.exports = {
  idSchema,
  createProfileSchema,
  updateProfileSchema,
  WorkingInformation,
  AdditionalInformation
}
