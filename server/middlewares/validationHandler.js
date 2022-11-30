import boom from 'boom'

const validateHandle = (data, schema) => {
  const { error } = schema.validate(data)
  return error
}

export const validate = (schema, check = 'body') => {
  return function (req, res, next) {
    const error = validateHandle(req[check], schema)
    error ? next(boom.badRequest(error)) : next()
  }
}
