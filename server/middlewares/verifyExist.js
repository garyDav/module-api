import { UserServiceDB } from 'module-db'

const userServiceDB = new UserServiceDB()

const checkUserExisted = async (req, res, next) => {
  try {
    let id = null
    if ( req.params?.id )
      id = req.params.id
    else if (req.body?.user)
      id = req.body.user

    const user = await userServiceDB.findById(id)
    if (!user) throw new Error('The User does not exist')

    next()
  } catch (error) {
    next(error)
  }
}

export { checkUserExisted }
