import { Router } from 'express'
import { MateriasService } from '../services/index.js'
import { authJwt } from '../middlewares/index.js'

function MateriasApi(app) {
  const router = Router()
  app.use('/api/materias', router)
  const service = new MateriasService()

  router.get(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res, next) => {
      try {
        const data = await service.listMaterias()

        res.status(200).json({
          message: 'List All Materias',
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
        const data = await service.getOneMateria(id)

        res.status(200).json({
          message: 'Get One Materia',
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
        const data = await service.deleteOneMateria(id)

        res.status(200).json({
          message: 'Delete One Materia',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/',
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        const data = await service.createMateria(_data)

        res.status(200).json({
          message: 'Materia Created Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default MateriasApi
