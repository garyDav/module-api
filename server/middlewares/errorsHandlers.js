import boom from 'boom'
import config from '../config/index.js'

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack } // Object.assign({}, err, stack)
  }
}

function logErrors(err, req, res, next) {
  console.log(err.stack)
  next(err)
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next(err)
}

function clientErrorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err
  res.status(statusCode).json(withErrorStack(payload, err.stack))
}

export { logErrors, wrapErrors, clientErrorHandler }
