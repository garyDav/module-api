import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import { UserServiceDB } from 'module-db'

const userServiceDB = new UserServiceDB()

class AuthService {
  async signUp(user, roles) {
    if (user?.password)
      user['password'] = await userServiceDB.encryptPassword(user['password'])
    const savedUser = await userServiceDB.register(user, roles)
    const payload = {
      _id: savedUser['_id'],
      username: savedUser['username'],
      email: savedUser['email'],
      roles: savedUser['roles'],
    }

    // Create a token
    const token = jwt.sign(payload, config.authJwtSecret, {
      expiresIn: config.authJwtTime,
    })

    return [ token, payload ]
  }
}

export default AuthService
