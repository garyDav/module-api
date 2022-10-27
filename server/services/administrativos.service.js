import { AdministrativosServiceDB } from 'module-db'

const administrativosServiceDB = new AdministrativosServiceDB()

class AdministrativosService {
  listAdministrativos() {
    return administrativosServiceDB.findAll()
  }

  async getOneAdministrativo( id ) {
    const data = await administrativosServiceDB.findById( id )
    if (!data) throw new Error('The Administrativo does not exist')

    return data
  }

  async deleteOneAdministrativo( id ) {
    const data = await administrativosServiceDB.findById( id )
    if (!data) throw new Error('The Administrativo does not exist')

    return administrativosServiceDB.deleteById( id )
  }

  createAdministrativo(data) {
    return administrativosServiceDB.create(data)
  }
}

export default AdministrativosService
