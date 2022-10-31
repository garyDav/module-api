import { Router } from 'express'
import fileUpload from 'express-fileupload'
import { authJwt } from '../middlewares/index.js'

import { UploadService } from '../services/index.js'

function UploadApi(app) {
  const router = Router()
  router.use(fileUpload())
  app.use('/api/upload', router)
  const service = new UploadService()

  router.post('/:path?', authJwt.verifyToken, async (req, res, next) => {
    const {
      files,
      params: { path },
    } = req

    try {
      const data = await service.uploadFile(files, path)
      if (data?.error) throw new Error(data.message)

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  })
}

export default UploadApi
