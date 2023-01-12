import { Router } from 'express'
import { InscripcionService } from '../services/index.js'
import { EstudiantesService } from '../services/index.js'
import { authJwt } from '../middlewares/index.js'

function InscripcionApi(app) {
  const router = Router()
  app.use('/api/inscripcion', router)
  const service = new InscripcionService()
  const serviceEst = new EstudiantesService()

  router.get(
    '/',
    [authJwt.verifyToken, authJwt.hasAccess(['admin', 'inscriptor'])],
    async (req, res, next) => {
      try {
        const data = await service.listInscripciones()

        res.status(200).json({
          message: 'List All Inscripcion',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.get(
    '/:id',
    [authJwt.verifyToken, authJwt.hasAccess(['admin', 'inscriptor'])],
    async (req, res, next) => {
      const { id } = req.params

      try {
        const data = await service.getOneInscripcion(id)

        res.status(200).json({
          message: 'Get One Inscripcion',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.delete(
    '/:id',
    [authJwt.verifyToken, authJwt.hasAccess(['admin', 'inscriptor'])],
    async (req, res, next) => {
      const { id } = req.params

      try {
        const data = await service.deleteOneInscripcion(id)

        res.status(200).json({
          message: 'Delete One Inscripcion',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/01',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await serviceEst.getOneEstudianteByIdUser(req.userId)
        _data.user = req.userId
        _data.steps = 'step-01'
        const data = await service.createInscripcion(_data)

        res.status(200).json({
          message: 'Inscripcion Created Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/02',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await service.getOneInscripcionByIdUser(req.userId)
        if (Object.keys(_data).length < 18)
          throw new Error('Faltan campos requeridos.')

        _data.userId = req.userId
        _data.steps = 'step-02'
        const data = await service.updateInscripcion(_data)

        res.status(200).json({
          message: 'Update Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/03',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await service.getOneInscripcionByIdUser(req.userId)
        if (Object.keys(_data).length < 10)
          throw new Error('Faltan campos requeridos.')

        _data.userId = req.userId
        _data.steps = 'step-03'
        const data = await service.updateInscripcion(_data)

        res.status(200).json({
          message: 'Update Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/04',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await service.getOneInscripcionByIdUser(req.userId)
        if (Object.keys(_data).length < 10)
          throw new Error('Faltan campos requeridos.')

        _data.userId = req.userId
        _data.steps = 'step-04'
        const data = await service.updateInscripcion(_data)

        res.status(200).json({
          message: 'Update Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/05',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await service.getOneInscripcionByIdUser(req.userId)
        if (Object.keys(_data).length < 1)
          throw new Error('Faltan campos requeridos.')

        _data.userId = req.userId
        _data.steps = 'step-05'
        const data = await service.updateInscripcion(_data)

        res.status(200).json({
          message: 'Update Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/06',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await service.getOneInscripcionByIdUser(req.userId)
        if (Object.keys(_data).length < 10)
          throw new Error('Faltan campos requeridos.')

        _data.userId = req.userId
        _data.steps = 'step-06'
        const data = await service.updateInscripcion(_data)

        res.status(200).json({
          message: 'Update Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/07',
    [
      authJwt.verifyToken,
      authJwt.hasAccess(['admin', 'inscriptor', 'estudiante']),
    ],
    async (req, res, next) => {
      const { body: _data } = req

      try {
        await service.getOneInscripcionByIdUser(req.userId)
        if (Object.keys(_data).length < 3)
          throw new Error('Faltan campos requeridos.')

        _data.userId = req.userId
        _data.steps = 'step-07'
        const data = await service.updateInscripcion(_data)

        res.status(200).json({
          message: 'Update Successfully',
          data,
        })
      } catch (err) {
        next(err)
      }
    }
  )
}

export default InscripcionApi
