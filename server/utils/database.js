//import MongoDB, { AgentServiceDB, MetricServiceDB, UserServiceDB, UserModel, RoleModel, ROLES } from 'module-db'
import MongoDB from 'module-db'
import config from '../config/index.js'

async function setup() {
  const {
    dbUser = 'root',
    dbPassword = 'example',
    dbHost = 'localhost',
    dbPort = 27017,
    dbName = 'module-db',
  } = config

  const db = new MongoDB({ dbUser, dbPassword, dbHost, dbPort, dbName })
  await db.connect()
}

setup()
