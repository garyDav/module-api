import boom from 'boom'
import processPath from '../../lib/path'
import moveFile from '../../lib/mv'

function uploadFileMiddleware(attr, path) {
  return async (req, res, next) => {
    const { files } = req
    try {
      if (!files) {
        throw 'No se subio ningún archivo'
      }

      const dirPath = processPath(path)
      let file = files[attr]

      if ( Array.isArray(file) ) {
        throw 'Solo debe subir un archivo'
      }

      const fileName = await moveFile(file, dirPath.absolutePath)

      req.fileName = fileName
      next()
    } catch (err) {
      next(boom.badRequest(err))
    }
  }
}

export default uploadFileMiddleware
