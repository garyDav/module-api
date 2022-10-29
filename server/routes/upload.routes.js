import { Router } from 'express'
import fileUpload from 'express-fileupload'

import { UploadService } from '../services/index.js'

function UploadApi(app) {
  const router = Router()
  router.use(fileUpload())
  app.use('/api/upload', router)
  const service = new UploadService()

  router.post('/:path?', async (req, res, next) => {
    const {
      files,
      params: { path },
    } = req

    try {
      console.log(files)
      const data = await service.uploadFile(files, path)
      if (data?.error) throw new Error(data.message)

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  })
}

export default UploadApi
