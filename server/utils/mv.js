import path from 'path'
import fs from 'fs'

const moveFile = (file, storagePath) => {
  file.name = `${new Date().getTime().toString().slice(6)}-${file.name}`
  const filePath = path.join(storagePath, file.name)
  //console.log('filePath: ', filePath)

  return new Promise((resolve, reject) => {
    fs.promises
      .access(filePath)
      .then(() => reject(new Error(`Archivo ${file.name} ya existe.`)))
      .catch(() =>
        file.mv(filePath, err => {
          if (err) {
            reject(err)
          } else {
            resolve(file.name)
          }
        })
      )
  })
}

export default moveFile
