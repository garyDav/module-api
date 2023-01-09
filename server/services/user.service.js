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

  async listUsers() {
    return userServiceDB.findAll().populate('roles')
  }

  async getOneUser() {}

  async deleteOneUser(id) {
    const data = await userServiceDB.findById(id)
    if (!data) throw new Error('The User does not exist')

    return userServiceDB.deleteById(id)
  }
}

export default UserService
