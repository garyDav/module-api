import { Strategy } from 'passport-local'
import boom from 'boom'

import { UserServiceDB } from 'module-db'

const userService = new UserServiceDB()

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  async function (email, password, done) {
    try {
      // Request body email can be an email or username
      const userFound = await userService.findByEmail(email)

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
