import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import config from '../config/index.js'
import { AuthService } from '../services/index.js'
import { authJwt, verifySignup, validation } from '../middlewares/index.js'
import { authUserSchema } from '../utils/schemas/index.js'

function authApi(app) {
  const router = Router()
  app.use('/api/auth', router)
  const service = new AuthService()

  router.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  router.get('/jwt', [authJwt.verifyToken], async (req, res, next) => {
    const { decoded: payload, user } = req

    try {
      delete payload.iat
      delete payload.exp
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: config.authJwtTime,
      })
      const roles = user['roles'].map(el => el.name)
      const data = {
        _id: user['_id'],
        username: user['username'],
        email: user['email'],
        roles,
        niveles: user['niveles'],
      }

      res.setHeader('Authorization', `Bearer ${token}`)
      return res.status(200).json({ message: 'renew token successfully', data })
    } catch (err) {
      next(err)
    }
  })

  router.post(
    '/signup',
    [
      verifySignup.checkDuplicateUsernameOrEmail,
      verifySignup.checkRolesExisted,
    ],
    async (req, res, next) => {
      const { body: _data } = req
      let roles = []
      if (_data?.roles) {
        roles = _data['roles']
        delete _data.roles
      }

      try {
        const [token, data] = await service.signUp(_data, roles)

        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({
          message: 'signup successfully',
          data,
          token,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/signin',
    [validation.validate(authUserSchema)],
    async (req, res, next) => {
      passport.authenticate('local', (error, user) => {
        if (error) return next(error)

        req.login(user, { session: false }, async error => {
          if (error) return next(error)

          const payload = {
            _id: user['_id'],
            username: user['username'],
            email: user['email'],
          }
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: config.authJwtTime,
          })
          const roles = user['roles'].map(el => el.name)
          const data = {
            _id: user['_id'],
            username: user['username'],
            email: user['email'],
            roles,
            niveles: user['niveles'],
          }

          res.setHeader('Authorization', `Bearer ${token}`)
          return res.status(200).json({
            message: 'signin successfully',
            data,
          })
        })
      })(req, res, next)
    }
  )
}

export default authApi
