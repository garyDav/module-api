import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import boom from 'boom'
import bcrypt from 'bcrypt'
import WebUsuario from '../../models/WebUsuario'

passport.use(
  new BasicStrategy(async function(username, password, cb) {
    try {
      const usuario = await WebUsuario.findOne({
        where: { email: username }
      })

      if (!usuario) {
        return cb(boom.unauthorized(), false)
      }

      if (!(await bcrypt.compare(password, usuario.dataValues.password))) {
        return cb(boom.unauthorized(), false)
      }

      return cb(null, usuario.dataValues)
    } catch (error) {
      return cb(error)
    }
  })
)
