import { Strategy } from 'passport-local'
import boom from 'boom'

import { UserServiceDB } from 'module-db'

const userService = new UserServiceDB()

const localStrategy = new Strategy(
  {
    session: false,
  },
  async function (username, password, done) {
    try {
      // Request body email can be an email or username
      const userFound = await userService.findByUsername(username)

      if (!userFound) return done(boom.unauthorized(), false)

      const matchPassword = await userService.comparePassword(
        password,
        userFound.password
      )

      if (!matchPassword) return done(boom.unauthorized(), false)

      return done(null, userFound)
    } catch (error) {
      return done(error)
    }
  }
)

export default localStrategy
