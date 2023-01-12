import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import boom from 'boom'
import cors from 'cors'
import helmet from 'helmet'
import passport from 'passport'

import pkg from '../package.json' assert { type: 'json' }
import config from './config/index.js'
import processPath from './utils/path.js'
import localStrategy from './utils/auth/local.js'
import {
  logErrors,
  wrapErrors,
  clientErrorHandler,
} from './middlewares/errorsHandlers.js'
import {
  authApiRouter,
  userApiRouter,
  AdministrativosApiRouter,
  EstudiantesApiRouter,
  AcademicosApiRouter,
  MateriasApiRouter,
  UploadApiRouter,
  BancoPreguntasApiRouter,
  InscripcionApiRouter,
} from './routes/index.js'

// App
const app = express()

// Settings
app.set('pkg', pkg)
app.set('port', config.port)

// Middlewares
app.use(json({ limit: '100mb' }))
app.use(urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))
app.use(passport.initialize())
passport.use(localStrategy)

// Security
const whitelist = ['http://localhost:3000', 'http://localhost:5173']
const options = {
  exposedHeaders: 'Authorization',
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  },
}
app.use(cors(options))
/*if (config.dev) {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept'
    )
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, PUT, GET, PATCH, DELETE, OPTIONS'
    )
    next()
  })
}*/

// Static files
app.use('/api/upload', express.static(processPath().absolutePath))

// Routes
authApiRouter(app)
userApiRouter(app)
AdministrativosApiRouter(app)
EstudiantesApiRouter(app)
AcademicosApiRouter(app)
MateriasApiRouter(app)
UploadApiRouter(app)
BancoPreguntasApiRouter(app)
InscripcionApiRouter(app)

// Redirect
app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to my API',
    name: app.get('pkg').name,
    version: app.get('pkg').version,
    description: app.get('pkg').description,
    repository: app.get('pkg').repository.url,
    license: app.get('pkg').license,
    author: app.get('pkg').author,
    homepage: app.get('pkg').homepage,
  })
})

// Verify router
app.use((req, res, next) => {
  const {
    output: { statusCode, payload },
  } = boom.notFound()

  res.status(statusCode).json(payload)
})

// Error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)

export default app
