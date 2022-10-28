import { Router } from 'express'
import { AcademicosService } from '../services/index.js'
import { authJwt, verifyExist } from '../middlewares/index.js'

function AcademicosApi(app) {
  const router = Router()
  app.use('/api/academicos', router)
  const service = new AcademicosService()

  router.get(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res, next) => {
      try {
        const data = await service.listAcademicos()

        res.status(200).json({
          message: 'List All Academicos',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.get(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res, next) => {
      const { id } = req.params

      try {
        const data = await service.getOneAcademico(id)

        res.status(200).json({
          message: 'Get One Academico',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res, next) => {
      const { id } = req.params

      try {
        const data = await service.deleteOneAcademico(id)

        res.status(200).json({
          message: 'Delete One Academico',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin, verifyExist.checkUserExisted],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        const data = await service.createAcademico(_data)

        res.status(200).json({
          message: 'Academico Created Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default AcademicosApi
