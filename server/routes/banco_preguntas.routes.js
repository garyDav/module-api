import { Router } from 'express'
import { BancoPreguntasService, AcademicosService } from '../services/index.js'
import { authJwt } from '../middlewares/index.js'

function BancoPreguntasApi(app) {
  const router = Router()
  app.use('/api/banco_preguntas', router)
  const service = new BancoPreguntasService()
  const service2 = new AcademicosService()

  router.get('/', [authJwt.verifyToken], async (req, res, next) => {
    try {
      const data = await service.listBancoPreguntas()

      res.status(200).json({
        message: 'List All BancoPreguntas',
        data,
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/user/:id', [authJwt.verifyToken], async (req, res, next) => {
    const { id } = req.params

    try {
      const data = await service2.getOneAcademicoByUserId(id)
      const bancoPreguntas = await service.getOneByAcademicoId(data._id)

      res.status(200).json({
        message: 'Get One BancoPregunta By User ID',
        data: bancoPreguntas,
      })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:id', [authJwt.verifyToken], async (req, res, next) => {
    const { id } = req.params

    try {
      const data = await service.getOneBancoPregunta(id)

      res.status(200).json({
        message: 'Get One BancoPregunta',
        data,
      })
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:id', [authJwt.verifyToken], async (req, res, next) => {
    const { id } = req.params

    try {
      const data = await service.deleteOneBancoPregunta(id)

      res.status(200).json({
        message: 'Delete One BancoPregunta',
        data,
      })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', [authJwt.verifyToken], async (req, res, next) => {
    const { body: _data } = req

    try {
      const data = await service.createBancoPregunta(_data)

      res.status(200).json({
        message: 'BancoPregunta Created Successfully',
        data,
      })
    } catch (err) {
      next(err)
    }
  })
}

export default BancoPreguntasApi
