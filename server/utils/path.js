import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

import storage from './storage.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const slash = process.platform === 'win32' ? '\\' : '/'

const processPath = urlPath => {
  const relativePath = urlPath ? urlPath.replace(/--/g, slash) : slash
  const absolutePath = path.join(__dirname, '../', storage, relativePath)

  return { relativePath, absolutePath }
}

export default processPath
