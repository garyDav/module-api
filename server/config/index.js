import dotenv from 'dotenv'

dotenv.config()

export default {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  host: process.env.HOST,
  server: process.env.SERVER,
  storage: process.env.STORAGE,
  upload: process.env.UPLOAD,

  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,

  authJwtSecret: process.env.AUTH_JWT_SECRET,
  authJwtTime: process.env.AUTH_JWT_TIME,
}
