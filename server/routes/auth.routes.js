import { Router } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import config from '../config/index.js'
import { AuthService } from '../services/index.js'
import { verifySignup } from '../middlewares/index.js'

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
        const [ token, data ] = await service.signUp(_data, roles)

        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({
          message: 'signup successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post('/signin', async (req, res, next) => {
    passport.authenticate('local', (error, user) => {
      if (error) return next(error)

      req.login(user, { session: false }, async error => {
        if (error) return next(error)

        const payload = {
          _id: user['_id'],
          username: user['username'],
          email: user['email'],
          roles: user['roles'],
        }
        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: config.authJwtTime,
        })

        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({
          message: 'signin successfully',
          data: payload
        })
      })
    })(req, res, next)
  })
}

export default authApi
