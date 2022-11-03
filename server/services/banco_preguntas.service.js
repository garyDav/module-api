import { BancoPreguntasServiceDB } from 'module-db'

const bancoPreguntasServiceDB = new BancoPreguntasServiceDB()

class BancoPreguntasService {
  listBancoPreguntas() {
    return bancoPreguntasServiceDB.findAll()
  }

  async getOneBancoPregunta(id) {
    const data = await bancoPreguntasServiceDB.findById(id)
    if (!data) throw new Error('The BancoPregunta does not exist')

    return data
  }

  async getOneByAcademicoId(id) {
    const data = await bancoPreguntasServiceDB.findByAcademicoId(id)
    if (!data) throw new Error('The BancoPregunta does not exist by Academico ID')

    return data
  }

  async deleteOneBancoPregunta(id) {
    const data = await bancoPreguntasServiceDB.findById(id)
    if (!data) throw new Error('The BancoPregunta does not exist')

    return bancoPreguntasServiceDB.deleteById(id)
  }

  createBancoPregunta(data) {
    return bancoPreguntasServiceDB.create(data)
  }
}

export default BancoPreguntasService
