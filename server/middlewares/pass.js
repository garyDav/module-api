import boom from 'boom'

function pass(...roles) {
  return function(req, res, next) {
    let rol = null
    if ( req['user'] && req['user']['wrol'] ) {
      rol = req.user.wrol.dataValues.nombre
      roles.unshift('admin')
      roles.find(el => el == rol) ? next() : next(boom.badRequest('Falta de permisos'))
    } else
      next(boom.badRequest('Falta de permisos'))
  }
}

export default pass
