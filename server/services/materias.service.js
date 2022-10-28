import { MateriasServiceDB } from 'module-db'

const materiasServiceDB = new MateriasServiceDB()

class MateriasService {
  listMaterias() {
    return materiasServiceDB.findAll()
  }

  async getOneMateria(id) {
    const data = await materiasServiceDB.findById(id)
    if (!data) throw new Error('The Materia does not exist')

    return data
  }

  async deleteOneMateria(id) {
    const data = await materiasServiceDB.findById(id)
    if (!data) throw new Error('The Materia does not exist')

    return materiasServiceDB.deleteById(id)
  }

  createMateria(data) {
    return materiasServiceDB.create(data)
  }
}

export default MateriasService
