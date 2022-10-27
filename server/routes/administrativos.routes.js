import { Router } from 'express'
import { AdministrativosService } from '../services/index.js'
import { authJwt, verifyExist } from '../middlewares/index.js'

function AdministrativosApi(app) {
  const router = Router()
  app.use('/api/administrativos', router)
  const service = new AdministrativosService()

  router.get(
    '/',
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
    ],
    async (req, res, next) => {
      try {
        const data = await service.listAdministrativos()

        res.status(200).json({
          message: 'List All Administrativos',
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
        const data = await service.getOneAdministrativo( id )

        res.status(200).json({
          message: 'Get One Administrativo',
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
        const data = await service.deleteOneAdministrativo( id )

        res.status(200).json({
          message: 'Delete One Administrativo',
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
      verifyExist.checkUserExisted,
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        const data = await service.createAdministrativo(_data)

        res.status(200).json({
          message: 'Administrativo Created Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default AdministrativosApi
