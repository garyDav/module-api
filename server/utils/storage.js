import config from '../config/index.js'

const storage = config.storage

if (!storage) {
  console.error(
    'Ruta de almacenamiento no definida, ',
    'establezca un valor para la variable de entorno "storage"'
  )
  process.exit(1)
}

export default storage
