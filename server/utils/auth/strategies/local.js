import passport from 'passport'
import { Strategy } from 'passport-local'
import boom from 'boom'
import bcrypt from 'bcrypt'
import { Op, fn, col, where } from 'sequelize'
import { models } from '../../../lib/sequelize'

passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  async function(email, password, done) {
    try {
      const optionsWeb = {
        include: [
          {
            model: models.WebRol,
            as: 'wrol'
          }
        ],
        where: { email }
      }
      const optionsApp = {
        where: {
          [Op.and]: [
            { email },
            where(fn('CRYPT', password, col('pin_password')), {
              [Op.like]: col('pin_password')
            })
          ]
        }
      }
      const web_usuario = await models.WebUsuario.findOne(optionsWeb)
      const app_usuario = await models.Usuario.findOne(optionsApp)

      if (!app_usuario) { // Si no existe el usuario en la app, buscamos en los usuarios de la web
        if (!web_usuario) {
          return done(boom.unauthorized(), false)
        } else { // Si existe el usuario de la web verificamos su contraseña
          if (!(await bcrypt.compare(password, web_usuario.dataValues.password))) {
            return done(boom.unauthorized(), false)
          }
          web_usuario.dataValues['auth'] = 'web'
          return done(null, web_usuario.dataValues)
        }
      }

      app_usuario.dataValues['auth'] = 'app'
      return done(null, app_usuario.dataValues)
    } catch (error) {
      return done(error)
    }
  })
)
