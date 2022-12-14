import jwt from 'jsonwebtoken'
import { UserServiceDB, RoleServiceDB } from 'module-db'

import config from '../config/index.js'

const userServiceDB = new UserServiceDB()
const roleServiceDB = new RoleServiceDB()

export const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  try {
    if (!token || token === 'null') throw new Error('No token provided')

    const decoded = jwt.verify(token, config.authJwtSecret)
    req.userId = decoded?._id
    req.decoded = decoded

    const user = await userServiceDB.findById(req.userId)
    if (!user) throw new Error('No user found')

    next()
  } catch (error) {
    return next(error)
  }
}

export const isModerator = async (req, res, next) => {
  try {
    const user = await userServiceDB.findById(req.userId)
    const roles = await roleServiceDB.findByIds(user.roles)

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'moderator') {
        next()
        return
      }
    }

    throw new Error('Require Moderator Role!')
  } catch (error) {
    return next(error)
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userServiceDB.findById(req.userId)
    const roles = await roleServiceDB.findByIds(user.roles)

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next()
        return
      }
    }

    throw new Error('Require Admin Role!')
  } catch (error) {
    return next(error)
  }
}
