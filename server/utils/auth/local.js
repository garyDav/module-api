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
      // username puede ser C.I. o usuario
      const regex = /^[0-9]*$/
      const userFound = regex.test(username)
        ? await userService.findByCI(username)
        : await userService.findByUsername(username)

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
