import { Router } from 'express'
import { EstudiantesService } from '../services/index.js'
import { authJwt } from '../middlewares/index.js'

function EstudiantesApi(app) {
  const router = Router()
  app.use('/api/estudiantes', router)
  const service = new EstudiantesService()

  router.get(
    '/',
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    async (req, res, next) => {
      try {
        const data = await service.listEstudiantes()

        res.status(200).json({
          message: 'List All Estudiantes',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.get(
    '/:id',
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    async (req, res, next) => {
      const { id } = req.params

      try {
        const data = await service.getOneEstudiante( id )

        res.status(200).json({
          message: 'Get One Estudiante',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.delete(
    '/:id',
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    async (req, res, next) => {
      const { id } = req.params

      try {
        const data = await service.deleteOneEstudiante( id )

        res.status(200).json({
          message: 'Delete One Estudiante',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/',
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        const data = await service.createEstudiante(_data)

        res.status(200).json({
          message: 'Estudiante Created Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default EstudiantesApi
