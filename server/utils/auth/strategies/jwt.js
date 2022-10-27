import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import boom from 'boom'
import { config } from '../../../config'
import { models } from '../../../lib/sequelize'

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, done) {
      try {
        const options = {
          include: [
            {
              model: models.WebRol,
              as: 'wrol'
            }
          ],
          where: { email: tokenPayload.email }
        }
        const usuario = await models.WebUsuario.findOne(options)

        if (!usuario) {
          return done(boom.unauthorized(), false)
        }

        return done(null, usuario.dataValues)
      } catch (error) {
        return done(error)
      }
    }
  )
)
