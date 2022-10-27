import { UserServiceDB, ROLES } from 'module-db'

const userServiceDB = new UserServiceDB()

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await userServiceDB.findByUsername(req.body.username)
    if (user) throw new Error('The username already exists')
    const email = await userServiceDB.findByEmail(req.body.email)
    if (email) throw new Error('The email already exists')

    next()
  } catch (error) {
    next(error)
  }
}

const checkRolesExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          throw new Error(`Role ${req.body.roles[i]} does not exist`)
        }
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

export { checkDuplicateUsernameOrEmail, checkRolesExisted }
