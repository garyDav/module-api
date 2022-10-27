import { Router } from 'express'
import { UserService } from '../services/index.js'
import { authJwt, verifySignup } from '../middlewares/index.js'

function userApi(app) {
  const router = Router()
  app.use('/api/users', router)
  const service = new UserService()

  router.post(
    '/',
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifySignup.checkDuplicateUsernameOrEmail,
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        const data = await service.createUser(_data)

        res.status(200).json({
          message: 'user created successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default userApi
