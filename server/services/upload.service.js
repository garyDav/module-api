import processPath from '../utils/path.js'
import moveFile from '../utils/mv.js'

class Upload {
  async uploadFile(files, path) {
    if (!files) {
      return {
        error: true,
        message: 'Ningun archivo fue cargado',
      }
    }

    const dirPath = processPath(path)
    const nameFiles = []
    let ufiles = files.files
    if (!Array.isArray(ufiles)) {
      ufiles = [ufiles]
    }
    for (const file of ufiles) {
      nameFiles.push(await moveFile(file, dirPath.absolutePath))
    }

    return {
      message: 'Archivos subidos correctamente',
      path: dirPath.relativePath,
      nameFiles,
    }
  }
}

export default Upload
