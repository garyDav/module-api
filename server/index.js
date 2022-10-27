import Debug from 'debug'
import { createServer } from 'http'
import app from './app.js'
import './utils/database.js'

const debug = Debug('app:server')
const server = createServer(app)

function start() {
  // Server
  server.listen(app.get('port'), _ => {
    debug(`Listening http://localhost:${server.address().port}`)
  })
}

start()
