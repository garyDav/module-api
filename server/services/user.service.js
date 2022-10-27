import { UserServiceDB, RoleServiceDB } from 'module-db'

const userServiceDB = new UserServiceDB()
const roleServiceDB = new RoleServiceDB()

class UserService {
  async createUser(user) {
    const rolesFound = await roleServiceDB.findByNames(user.roles)
    // creating a new User
    const savedUser = await userServiceDB.create({
      ...user,
      roles: rolesFound.map(role => role._id),
    })

    return {
      _id: savedUser['_id'],
      username: savedUser['username'],
      email: savedUser['email'],
      roles: savedUser['roles'],
    }
  }

  async getUsers() {}

  async getUser() {}
}

export default UserService
